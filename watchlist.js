const container = document.getElementById("watchlistContainer");

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

async function showWatchlist() {

  container.innerHTML = "";

  if (watchlist.length === 0) {
    container.innerHTML = "<p>No movies in watchlist</p>";
    return;
  }

  for (let id of watchlist) {

    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=460a15d4`);
    const movie = await res.json();

    let poster = movie.Poster;
    if (poster === "N/A") {
      poster = "https://via.placeholder.com/150";
    }

    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${movie.Title}</h3>
      <img src="${poster}">
      <p>${movie.Year}</p>
      <button onclick="removeMovie('${id}')">Remove ❌</button>
    `;

    container.appendChild(card);
  }
}

function removeMovie(id) {
  watchlist = watchlist.filter(m => m !== id);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  showWatchlist();
}

showWatchlist();