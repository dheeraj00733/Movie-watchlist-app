const API_KEY = "460a15d4";


async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  if (!query) return;

  const loading = document.getElementById("loading");
  const container = document.getElementById("moviesContainer");

  loading.style.display = "block";
  container.innerHTML = "" ;

  
