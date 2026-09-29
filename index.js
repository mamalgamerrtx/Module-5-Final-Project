const apiKey = "dea51ad";

// Mock list displayed ONLY on initial page load (0 API calls used)
const mockMovies = [
  {
    Title: "Sex and the City",
    Year: "2008",
    imdbID: "tt1000774",
    Type: "movie",
    Poster: "https://image.tmdb.org/t/p/w342/jfLp8gTfdi9d8onEFJ60kp1Bl1e.jpg",
    imdbRating: "5.7",
  },
  {
    Title: "Friends",
    Year: "1994",
    imdbID: "tt0108778",
    Type: "series",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
    imdbRating: "8.9",
  },
  {
    Title: "Invincible",
    Year: "2021",
    imdbID: "tt6741278",
    Type: "series",
    Poster: "https://image.tmdb.org/t/p/w342/4tblBrslcKSifMVZ3TmtT2ukMor.jpg",
    imdbRating: "8.7",
  },
  {
    Title: "Resident Evil",
    Year: "2002",
    imdbID: "tt0120804",
    Type: "movie",
    Poster: "https://image.tmdb.org/t/p/w342/i7UyjfPio0VFHB9rBUZSFyhOoM8.jpg",
    imdbRating: "7.3",
  },
  {
    Title: "Unabomber",
    Year: "2017",
    imdbID: "tt5618256",
    Type: "series",
    Poster: "https://image.tmdb.org/t/p/w342/39aMkR8Y5vhCG9dTkjiqRl8AVqp.jpg",
    imdbRating: "7.2",
  },
  {
    Title: "The Love Hypothesis",
    Year: "2024",
    imdbID: "tt22080644",
    Type: "movie",
    Poster: "https://image.tmdb.org/t/p/w342/vfZxVHextAGC70zrNhS8lsROqP1.jpg",
    imdbRating: "8.2",
  },
  {
    Title: "Toy Story 5",
    Year: "2026",
    imdbID: "tt26676580",
    Type: "movie",
    Poster: "https://image.tmdb.org/t/p/w342/sfQtVlIHljToOwYjhe21KPGzZWK.jpg",
    imdbRating: "8.3",
  },
  {
    Title: "One Last Shot",
    Year: "2021",
    imdbID: "tt12108196",
    Type: "movie",
    Poster: "https://image.tmdb.org/t/p/w342/niQ4NBh2jqAf1hDZP5m6ReWFAb7.jpg",
    imdbRating: "7.6",
  },
  {
    Title: "Heart of the Beast",
    Year: "2025",
    imdbID: "tt31526435",
    Type: "movie",
    Poster: "https://image.tmdb.org/t/p/w342/1ApfSA8JTqeha3GTFEY8syV4auq.jpg",
    imdbRating: "7.7",
  },
  {
    Title: "Obsession",
    Year: "2023",
    imdbID: "tt20244696",
    Type: "series",
    Poster: "https://image.tmdb.org/t/p/w342/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg",
    imdbRating: "8.2",
  },
  {
    Title: "Spider-Man: Brand New Day",
    Year: "2026",
    imdbID: "tt6320628",
    Type: "movie",
    Poster: "https://image.tmdb.org/t/p/w342/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
    imdbRating: "7.9",
  },
  {
    Title: "Find More Movies!",
    // Year: "2026",
    imdbID: "tt6320628",
    Type: "movie",
    Poster: "./assets/search.jpg",
    // imdbRating: "7.9",
  },
];
// end of const mockMovies array of objects
// DOM Elements
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const movieContainer = document.getElementById("movieContainer");

// Active movie list currently shown on screen
let currentMovies = [];

// Real API call triggered ONLY when submitting a search
async function searchMovies(query) {
  if (!query.trim()) return;
  movieContainer.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
    </div>
  `;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`,
    );
    const data = await response.json();
    console.log(data);

    if (data.Response !== "True") {
      currentMovies = [];
      movieContainer.innerHTML = `
    <p style="color: #f87171; grid-column: 1 / -1;">
      ${"No movies found."}
    </p>
  `;
      return;
    }

    currentMovies = data.Search;

    sortSelect.value && sortSelect.value !== "default"
      ? sortMovies(sortSelect.value)
      : renderMovies(currentMovies);
  } catch (err) {
    console.error("Error fetching data:", err);
    movieContainer.innerHTML =
      '<p style="color: #f87171; grid-column: 1 / -1;">An error occurred while fetching movies.</p>';
  } // this just displays error message to user
}

// Render movie cards
function renderMovies(movies) {
  if (!movies.length) {
    movieContainer.innerHTML =
      '<p style="color: #94a3b8; grid-column: 1 / -1;">No results to display.</p>';
    return;
  }
  const noMoviePoster =
    "https://moviesthisday.com/static/placeholder-poster.png";
  movieContainer.innerHTML = movies
    .map((movie) => {
      const poster =
        movie.Poster && movie.Poster !== "N/A" ? movie.Poster : noMoviePoster;

      //   const ratingBadge = movie.imdbRating
      //     ? `<span class="rating-badge"><i class="fa-solid fa-star"></i> ${movie.imdbRating}/10</span>`
      //     : "";
      //if exists pastes that span with fa-star and the actual rating number if not it pastes blank this does not work with name search only works with .imdbID
      return `
      <div class="movie-card">
        <div class="poster-wrapper">
      <img
        src="${poster}"
        alt="${movie.Title}"
        onerror="this.onerror=null; this.src='${noMoviePoster}';"
      >

        </div>
        <div class="movie-info">
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
        </div>
      </div>
    `;
    })
    .join("");
}

// Sorting logic
function sortMovies(order) {
  if (!currentMovies.length) return;

  const sorted = [...currentMovies].sort((a, b) => {
    switch (order) {
      case "alpha-asc":
        return a.Title.localeCompare(b.Title);
      case "alpha-desc":
        return b.Title.localeCompare(a.Title);
      case "year-desc":
        return parseInt(b.Year, 10) - parseInt(a.Year, 10);
      case "year-asc":
        return parseInt(a.Year, 10) - parseInt(b.Year, 10);
      default:
        return 0;
    }
  });

  renderMovies(sorted);
}

// Event Listeners
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   preventDefault is a js built-in method and not a function
  searchMovies(searchInput.value);
});

sortSelect.addEventListener("change", (e) => {
  sortMovies(e.target.value);
});

// Initial load using mock data (0 API quota used)
currentMovies = [...mockMovies];
renderMovies(currentMovies);
