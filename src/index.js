const form = document.querySelector("form");

const url = "https://api.discogs.com";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchedArtist = event.target.artistSearch.value;
  // console.log(event.target.artistSearch.value);
  fetch(`${url}/database/search?q={${searchedArtist}}`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((response) => response.json())
    .then((artistList) => {
      const artistId = artistList.results[0].id;
      fetch(`${url}/artists/${artistId}/releases`, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((response) => response.json())
        .then((albumList) => {
          albumList.releases.forEach((album) => {
            //create elements to append to the DOM
          });
        });
    });
});
//
// {
//     "id": 2328,
//     "title": "The GrimmRobe Demos",
//     "type": "master",
//     "main_release": 509475,
//     "artist": "Sunn O)))",
//     "role": "Main",
//     "resource_url": "https://api.discogs.com/masters/2328",
//     "year": 2000,
//     "thumb": "https://i.discogs.com/8db6cAkt_8b3vrgbDdJcMmqtQ876VVWUMFVdjIkqoyo/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTUwOTQ3/NS0xMTY3NDMyOTEz/LmpwZWc.jpeg",
//     "stats": {
//         "community": {
//             "in_wantlist": 156,
//             "in_collection": 197
//         },
//         "user": {
//             "in_wantlist": 0,
//             "in_collection": 0
//         }
//     }
// }

// Layout 
/* <div id="album-container">
<div class="row" id="row1"> /////////////////max of 6 albums per row
  <div class="two columns">
    <figure>
      <img src="http://placehold.it/">
      <figcaption>Album Title 1</figcaption>
    </figure>
  </div>
</div>
</div> */
const albumContainer = document.querySelector("#album-container");
albumContainer.innerHTML = "";

function populateAlbums(album) {
  const rowOne = document.createElement("div");
  rowOne.classList.add("row");
  rowOne.id = "row1";
  albumContainer.appendChild(rowOne);

  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = album.image;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = album.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);

  const layoutDiv = document.createElement("div");
  layoutDiv.class = "two columns";
  layoutDiv.appendChild(figure);

  let currentRow = albumContainer.querySelector("#row1");
  if (currentRow.childElementCount < 6) {
    currentRow.appendChild(layoutDiv);
  }
  else if (currentRow.childElementCount >= 6) {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.id = `row${currentRow.id.value.split("row")[1] + 1}`;
    albumContainer.appendChild(newRow);
    currentRow = albumContainer.querySelector
  }
}
