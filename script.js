const API_KEY = "460a15d4";

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

async function handleSearch() {

  const query = document.getElementById("searchInput").value;

  if (query === "") {
    alert("Enter movie name");
    return;
  }

  const container = document.getElementById("moviesContainer");
  const loading = document.getElementById("loading");

  loading.style.display = "block";
  container.innerHTML = "";

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    loading.style.display = "none";

    if (data.Search) {
      showMovies(data.Search);
    } else {
      container.innerHTML = "<p>No movies found</p>";
    }

  } catch (error) {
    console.log(error);
    loading.style.display = "none";
  }
}

function showMovies(movies) {

  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  movies.forEach(movie => {

    let poster = movie.Poster;
    if (poster === "N/A") {
      poster = "https://via.placeholder.com/150";
    }

    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${movie.Title}</h3>
      <img src="${poster}">
      <p>${movie.Year}</p>
      <button onclick="addToWatchlist('${movie.imdbID}')">
        Add to Watchlist ⭐
      </button>
    `;

    container.appendChild(card);
  });
}

function addToWatchlist(id) {

  if (!watchlist.includes(id)) {
    watchlist.push(id);
    alert("Added ⭐");
  } else {
    alert("Already added");
  }

  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}