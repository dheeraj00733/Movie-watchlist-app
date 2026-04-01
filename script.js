const API_KEY = "460a15d4";


async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  if (!query) return;

  const loading = document.getElementById("loading");
  const container = document.getElementById("moviesContainer");

  loading.style.display = "block";
  container.innerHTML = "" ;

  try {
     const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json()
    loading.style.display = "none";

    if (data.Search){
        displayMovies(data.Search)
    }else{
        container.innerHTML = "<p>No movies found</p>" ;
    }
  }catch(error){
    loading.style.display = "none";
    console.log(error)
  }
}

function displayMovies(movies){
    const container = document.getElementById("moviesContainer")
    movies.forEach(movie => {
        const div = document.createElement("div");

    div.innerHTML = `
    <h3>${movie.Title}</h3>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}"/>
      <p>${movie.Year}</p>
      <button>Add to Watchlist</button>
      `;

      container.appendChild(div)
    })
}