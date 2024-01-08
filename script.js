const options = {
  // API 요청을 위한 설정 객체
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer [Your API Key]'
  }
};

let darkLayer = null;
let movies = [];

// 영화 목록을 렌더링하는 함수
function renderMovies(filteredMovies) {
  let movieList = document.querySelector(".movie-list");
  movieList.innerHTML = ""; // 기존 영화 목록 초기화

  filteredMovies.forEach(movie => {
    let movieCard = document.createElement("div");
    movieCard.innerHTML = `<div class="movie-card" id="${movie.id}">
      <h3 class="movie-name">${movie.title}</h3>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="">
      <p class="movie-overview">${movie.overview}</p>
      <p class="movie-rating">Rating: ${movie.vote_average}</p>
    </div>`;
    
    // 각 영화 카드에 클릭 이벤트 추가
    movieCard.addEventListener("click", () => {
      let movieModal = document.createElement("div");
      movieModal.classList.add("modal");
      movieModal.classList.add("dark-layer")

      movieModal.innerHTML = `<div class="card mb-3" id="modalCard">
      <div class="row g-0">
      <div class="card-id">movie ID :${movie.id}</div>
        <div class="col-md-4">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-overview">${movie.overview}</p>
            <p class="card-text"><small class="card-rating">평점 : ${movie.vote_average}</small></p>
            <p class="release-date"> 개봉일 : ${movie.release_date}</p>
          </div>
        </div>
      </div>
    </div>`;

      // modal 바깥을 클릭했을 때 닫히도록 이벤트 추가
      movieModal.addEventListener("click", (event) => {
        if (event.target === movieModal) {
          document.body.removeChild(movieModal);
        }
      });

      document.body.appendChild(movieModal);
      movieModal.style.display = "block";
    });

    // 영화 목록에 영화 카드 추가
    movieList.appendChild(movieCard);
  });
}

// 입력된 쿼리와 일치하는 영화를 필터링하는 함수
function searchMovies(query) {
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()));
  renderMovies(filteredMovies);
}

// 윈도우 로드 시 실행 할 이벤트 리스너
window.addEventListener("load", function (event) {
  // 영화 데이터를 API에서 가져와서 처리
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    // 가져온 영화 데이터를 변수에 저장
    movies = data.results;
    
    // 처음에는 모든 영화를 출력
    renderMovies(movies);

    // 검색 버튼 클릭 이벤트 처리
    document.getElementById("search-button").addEventListener("click", function (event) {
      event.preventDefault();
      // 입력된 검색어를 가져와서 영화 검색
      const searchInput = document.getElementById("searchInput");
      const filterMovie = searchInput.value;
      searchMovies(filterMovie);
    });
  })
  .catch(err => console.error(err));
});

function reload() {
  location.reload();
}