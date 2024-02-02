//Constants
const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

//NASA API
const count = 10;
const NASA_API_KEY = "DEMO_KEY";
const NASA_APOD_ENDPOINT = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${count}`;

let resultsArray = [];
let favorites = {};

// Utility Functions
function toggleLoader(isVisible) {
  loader.classList[isVisible ? "remove" : "add"]("hidden");
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "instant" });
}
// Scroll To Top, Remove Loader, Show Content
function showPageContent(page) {
  const isResultPage = page === "results";
  resultsNav.classList.toggle("hidden", !isResultPage);
  favoritesNav.classList.toggle("hidden", isResultPage);
  scrollToTop();
  toggleLoader(false);
}

function getCurrentArray(page) {
  return page === "results" ? resultsArray : Object.values(favorites);
}

function createCardElement() {}
function createDOMNodes(page) {
  const currentArray = getCurrentArray(page);
  currentArray.forEach((result) => {
    //Card Container
    const card = document.createElement("div");
    card.classList.add("card");
    //Link
    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";
    // Image
    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");
    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    if (page === "results") {
      saveText.textContent = "Add To Favorites";
      saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = "Remove Favorites";
      saveText.setAttribute("onclick", `removeFavorite('${result.url}')`);
    }
    // Card Text
    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;
    // Copyright
    const copyrightResult =
      result.copyright === undefined ? " " : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;
    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, cardText, saveText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    //console.log(card);
    imagesContainer.appendChild(card);
  });
}
function updateDOM(page) {
  //Get Favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
    console.log("favorites from localStorage", favorites);
  }
  // Reset DOM, Create DOM Nodes, Show Content
  imagesContainer.textContent = "";
  createDOMNodes(page);
  showPageContent(page);
}

function saveFavorite(itemUrl) {
  //console.log(itemUrl);
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      //console.log(JSON.stringify(favorites));
      // Show Save Confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}

//10 Images from NASA API

async function getNasaPictures() {
  // Show Loader
  loader.classList.remove("hidden");
  try {
    const response = await fetch(NASA_APOD_ENDPOINT);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDOM("results");
  } catch (error) {
    console.error("Fetching data failed", error);
  }
}

//On Load
getNasaPictures();
console.log("halloWelt!");
