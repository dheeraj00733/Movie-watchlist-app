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
  const button = document.querySelector(".search-section button");

  loading.style.display = "block";
  container.innerHTML = "";
  button.disabled = true;
button.innerText = "Searching...";

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    loading.style.display = "none";
    button.disabled = false;
    button.innerText = "Search";

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
      <button>Add to Watchlist ⭐</button>
    `;


    card.querySelector("button").addEventListener("click", () => {
      addToWatchlist(movie);
    });

    container.appendChild(card);
  });
}



function addToWatchlist(movie) {


  let exists = watchlist.some(item => item.imdbID === movie.imdbID);

  if (exists) {
    alert("Already added");
    return;
  }


  let newMovie = {
    Title: movie.Title,
    Poster: movie.Poster,
    Year: movie.Year,
    imdbID: movie.imdbID
  };

  watchlist.push(newMovie);

  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  alert("Added ⭐");
}

function handleKey(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
}