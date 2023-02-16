const form = document.querySelector("form");

const albumContainer = document.querySelector("#album-container");

const url = "https://api.discogs.com";

const popupImage = document.querySelector("#albumDetail");

const popupDetail = document.querySelector("#popupDetail");

const popupYear = document.querySelector("#popupYear");

const popupContainer = document.querySelector("#popupContainer");

const artistBio = document.querySelector("#artist-bio");

function reloadAlbumContainer() {
  albumContainer.innerHTML = "";
  const rowOne = document.createElement("div");
  rowOne.classList.add("row");
  rowOne.classList.add("u-full-width");
  rowOne.id = "row1";
  albumContainer.appendChild(rowOne);
}

const getAlbumList = (artistId) => {
  fetch(`${url}/artists/${artistId}/releases`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((response) => response.json())
    .then((albumList) => {
      let currentRow = 1;
      let selectedRow = albumContainer.querySelector(`#row${currentRow}`);
      albumList.releases.forEach((album) => {
        //create elements to append to the DOM
        if (selectedRow.childElementCount < 6) {
          const currentAlbum = populateAlbum(album);
          selectedRow.appendChild(currentAlbum);
        } else if (selectedRow.childElementCount >= 6) {
          currentRow++;
          const newRow = document.createElement("div");
          newRow.className = "row u-full-width";
          newRow.id = `row${currentRow}`;
          albumContainer.appendChild(newRow);
          selectedRow = newRow;
          const currentAlbum = populateAlbum(album);
          selectedRow.appendChild(currentAlbum);
        }
      });
    });
};

const getArtistBio = (artistId) => {
  fetch(`${url}/artists/${artistId}`)
    .then((response) => response.json())
    .then((artistInfo) => {
      artistBio.textContent = artistInfo.profile;
    });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchedArtist = event.target.artistSearch.value;
  reloadAlbumContainer();

  // console.log(event.target.artistSearch.value);
  fetch(`${url}/database/search?q={${searchedArtist}}`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((response) => response.json())
    .then((artistList) => {
      const artistId = artistList.results[0].id;
      getAlbumList(artistId);
      getArtistBio(artistId);

      //
    });
});
//
function populateAlbum(album) {
  //initialized figure and links image, info
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = album.thumb;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = album.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  //Creates wrapper element for album
  const layoutDiv = document.createElement("div");
  layoutDiv.className = "two columns";
  layoutDiv.appendChild(figure);
  //adding event listener for hovering on the image element

  img.addEventListener("mouseenter", (event) => {
    popupContainer.classList.remove("hide");
    popupImage.src = album.thumb;
    popupDetail.textContent = album.title;
    popupYear.textContent = album.year;
  });

  img.addEventListener("mouseleave", (event) => {
    popupContainer.classList.add("hide");
  });

  return layoutDiv;
}

//figure.addEventListener("click", handleExpandDetails(album));

function handleExpandDetails(album) {}
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
