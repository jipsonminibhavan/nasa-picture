# NASA-API

Dieser Code stellt eine Webanwendung dar, die Bilder von der NASA API abruft und anzeigt. Die Anwendung ist in HTML, CSS und JavaScript geschrieben.
Die Anwendung ermöglicht es Benutzern, interessante Weltraumbilder von der NASA zu erkunden und ihre Favoriten zu speichern. 

- CSS
Es gibt Stile für den Ladebildschirm, den Navigationsbereich, den Bildcontainer und die Karten, die jedes Bild darstellen.
Responsives Design wird durch Media Queries unterstützt, um die Darstellung auf verschiedenen Bildschirmgrößen anzupassen.

- JavaScript
Die JavaScript-Datei enthält Logik, um Bilder von der NASA API zu holen, basierend auf dem festgelegten Anfrage-Endpunkt (NASA_APOD_ENDPOINT).
Bilder und zugehörige Daten (wie Titel, Datum, Erklärung) werden dynamisch in Karten (card) eingefügt, die im Bildcontainer angezeigt werden.
Benutzer können Bilder zu ihren Favoriten hinzufügen oder daraus entfernen. Diese Auswahl wird im Local Storage gespeichert.
Es gibt Funktionen zum Anzeigen und Verstecken des Ladebildschirms und zum Scrollen zur Seite.
Funktionen wie createDOMNodes und updateDOM verwalten das Erstellen und Aktualisieren der auf der Seite angezeigten Elemente.
