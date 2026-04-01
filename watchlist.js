// get container
const container = document.getElementById("watchlistContainer");

// get watchlist from localStorage
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// function to display movies
function showWatchlist() {

  // clear container
  container.innerHTML = "";

  // if empty
  if (watchlist.length === 0) {
    container.innerHTML = "<p>No movies in watchlist</p>";
    return;
  }

  // loop through movies
  watchlist.forEach(movie => {

    const card = document.createElement("div");

    // handle missing poster
    let poster = movie.Poster;
    if (poster === "N/A") {
      poster = "https://via.placeholder.com/150";
    }

    card.innerHTML = `
      <h3>${movie.Title}</h3>
      <img src="${poster}">
      <p>${movie.Year}</p>
      <button onclick="removeMovie('${movie.imdbID}')">
        Remove ❌
      </button>
    `;

    container.appendChild(card);
  });
}


