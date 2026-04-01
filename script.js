const API_KEY = "460a15d4";


async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  if (!query) return;

  const loading = document.getElementById("loading");
  const container = document.getElementById("moviesContainer");

  loading.style.display = "block";
  container.innerHTML = "" ;

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=460a15d4`);
    const data = await res.json()
    loading.style.display = "none";

    if (data.search){
        displayMovies(data.search)
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

    div.innerHTML = 
    <h3>${movie.Title}</h3>
    })
}