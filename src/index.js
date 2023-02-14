// hard coded search for now to make sure auth was working
fetch("https://api.discogs.com/database/search?q={prince}&{?artist}", {
  headers: {
    Authorization: TOKEN,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
