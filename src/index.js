const form = document.querySelector("form");

const url = "https://api.discogs.com";

// const releasesUrl = `https://api.discogs.com/artists/{${artistId}}/releases`;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchedArtist = event.target.artistSearch.value;
  console.log(event.target.artistSearch.value);
  fetch(`${url}/database/search?q={${searchedArtist}}`, {
    headers: {
      Authorization: TOKEN,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const artistId = data.results[0].id;
      console.log(artistId);
    });
});
//
