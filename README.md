# Album-Visualizer-Project-1

This web app allows a user to search an artist name, and it will display some information about them and visually lay out their album releases. The albums will be able to be clicked on to show information about the album and a tracklist.

\*A user of this website should be a able to use a search bar to input an artist and have the results show up on the page.

\*Once a user has selected an artist the website should display artist information likely in the form of a biography.

\*Once a user has selected an artist the website will also display the artists discography visually. When selecting an album the website will place that album in a larger detail, and probably show album details I.e. album title, year of release, etc.

---

This was my first major project for my software engineering boot camp. As a result, it is pretty primitive, having been written entirely in vanilla HTML and JavaScript. At the moment, this project would need to be cloned onto the user's local machine and the user would need to generate their own Discogs API key, ![here](https://www.discogs.com/settings/developers). After that, add it to src/tokens.js in the following format: `const TOKEN = "Discogs token=***************";`. After that, just search for an artist and their releases should appear! 

![Search results for Kendrick Lamar](/screenshots/phase-1-project-kendrick.png)

You can hover over a release to see an enlarged thumbnail and a tracklist.

![Hovering over To Pimp a Butterfly by Kendrick Lamar](/screenshots/phase-1-project-TPAB.png)