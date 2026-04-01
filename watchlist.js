
const container = document.getElementById("watchlistContainer");


let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];


function showWatchlist() {

  container.innerHTML = "";

  if (watchlist.length === 0) {
    container.innerHTML = "<p>No movies in watchlist</p>";
    return;
  }

  watchlist.forEach((movie, index) => {

    const card = document.createElement("div");
    card.className = "card";


    let title = movie.Title || movie.title || "No Title";
    let poster = movie.Poster || movie.poster || "";
    let year = movie.Year || movie.year || "N/A";
    let id = movie.imdbID || index;


    if (!poster || poster === "N/A") {
      poster = "https://via.placeholder.com/150";
    }

    card.innerHTML = `
      <h3>${title}</h3>
      <img src="${poster}" alt="${title}">
      <p>${year}</p>
      <button onclick="removeMovie('${id}')">Remove ❌</button>
    `;

    container.appendChild(card);
  });
}


function removeMovie(id) {


  watchlist = watchlist.filter((movie, index) => {
    return (movie.imdbID || index) != id;
  });

  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  showWatchlist();
}


showWatchlist();