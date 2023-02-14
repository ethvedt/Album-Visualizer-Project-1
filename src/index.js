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

document.addEventListener("DOMContentLoaded", () =>{
  albumContainer.innerHTML = "";
  // creates row div
  const rowOne = document.createElement("div");
  rowOne.classList.add("row");
  rowOne.classList.add("u-full-width");
  rowOne.id = "row1";
  albumContainer.appendChild(rowOne);
  fetch('http://localhost:3000/albums')
    .then(res => res.json())
    .then(albums => {
      let currentRow = 1;
      let selectedRow = albumContainer.querySelector(`#row${currentRow}`);
      albums.forEach(album => {
        if (selectedRow.childElementCount < 6) {
          const currentAlbum = populateAlbum(album);
          selectedRow.appendChild(currentAlbum);
          console.log(selectedRow.childElementCount);
        }
        else if (selectedRow.childElementCount >= 6) {
          currentRow++;
          const newRow = document.createElement("div");
          newRow.className = "row u-full-width";
          newRow.id = `row${currentRow}`;
          albumContainer.appendChild(newRow);
          console.log(selectedRow.childElementCount);
          selectedRow = newRow;
          const currentAlbum = populateAlbum(album);
          selectedRow.appendChild(currentAlbum);
          console.log(selectedRow.childElementCount);
        }
      });
    })
  }
)

function populateAlbum(album) {
//initialized figure and links image, info
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = album.image;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = album.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
//Creates wrapper element for album
  const layoutDiv = document.createElement("div");
  layoutDiv.className = "two columns";
  layoutDiv.appendChild(figure);
  return layoutDiv;
};
  //figure.addEventListener("click", handleExpandDetails(album));


function handleExpandDetails(album) {

};

