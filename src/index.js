const form = document.querySelector("form");

const albumContainer = document.querySelector("#album-container");

const url = "https://api.discogs.com";

const popupImage = document.querySelector("#albumDetail");

const popupDetail = document.querySelector("#popupDetail");

const popupYear = document.querySelector("#popupYear");

const popupContainer = document.querySelector("#popupContainer");

function reloadAlbumContainer() {
  albumContainer.innerHTML = "";
  const rowOne = document.createElement("div");
  rowOne.classList.add("row");
  rowOne.classList.add("u-full-width");
  rowOne.id = "row1";
  albumContainer.appendChild(rowOne);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchedArtist = event.target.artistSearch.value;
  reloadAlbumContainer();

  // console.log(event.target.artistSearch.value);
  fetch(`${url}/database/search?q={${searchedArtist}}&type=artist`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((response) => response.json())
    .then((artistList) => {
      const artistId = artistList.results[0].id;
      fetch(`${url}/database/search?type=release&artist={${artistList.results[0].title}}&country=US`, {
        headers: {
          Authorization: TOKEN,
        },
      })
        .then((response) => response.json())
        .then((albumList) => {
/*           const cleanAlbumList = albumList.results.filter((el, index, self) => {
            self.findIndex(album => album.master_id === el.master_id) === index;
            }) */
          let currentRow = 1;
          let selectedRow = albumContainer.querySelector(`#row${currentRow}`);
          albumList.results.forEach((album) => {
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
      });
    });
//
function populateAlbum(album) {
  //initialized figure and links image, info
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = album.thumb;
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = album.title.split(" - ")[1];
  figure.appendChild(img);
  figure.appendChild(figcaption);
  //Creates wrapper element for album
  const layoutDiv = document.createElement("div");
  layoutDiv.className = "two columns";
  layoutDiv.appendChild(figure);
  //Populating album info in popup
  const albumID = album.id;

  //adding event listener for hovering on the image element

  img.addEventListener("mouseenter", (event) => {
    popupContainer.classList.remove("hide");
    popupImage.src = album.thumb;
    popupDetail.textContent = album.title.split(" - ")[1];
    popupYear.textContent = album.year;
    const trackList = document.createElement("ol");
    fetch(`${url}/releases/${albumID}`, {
      headers: {
        Authorization: TOKEN,
      }
    })
      .then(res => res.json())
      .then(release => {
        for (const song of release.tracklist) {
          const songEntry = document.createElement('li');
          songEntry.classList.add('tracklist');
          const songName = document.createElement('span');
          songName.classList.add('justify-left');
          const runTime = document.createElement('span');
          runTime.classList.add('justify-right');
          runTime.innerText = song.duration;
          songName.innerText = song.title;
          songEntry.append(songName, runTime);
          trackList.appendChild(songEntry);
        }
      })
      .catch(error => {
        console.log(error);
        alert(error.message);
      });
    if (popupContainer.lastChild.nodeName = "OL") {
      const list = popupContainer.lastChild;
      popupContainer.removeChild(list);
    }
    popupContainer.appendChild(trackList);
  });

  img.addEventListener("mouseleave", (event) => {
    popupContainer.classList.add("hide");
  });

  return layoutDiv;
}

//figure.addEventListener("click", handleExpandDetails(album));

/* function handleExpandDetails(event, album) {
  const currentRow = event.target.parentNode.parentNode;
  const albumDetailsRow = document.createElement("div");
  albumDetailsRow.className = "row";
  const detailsLayoutDiv = document.createElement("div");
  detailsLayoutDiv.className = "offset-by-three eight columns";
  albumDetailsRow.appendChild(detailsLayoutDiv);
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  const albumID = album.id.value;
  fetch(`${url}/releases/${albumID}`, {
    headers: {
      Authorization: TOKEN,
    }
  })
    .then(res => res.json())
    .then(album => {
      const trackList = document.createElement("ol");
      for (const song in album.tracklist){
        let listElement = document.createElement('li');

      }
    })

} */


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
