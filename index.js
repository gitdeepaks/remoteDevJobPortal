// Global
const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
const errorEl = document.querySelector(".error");
const errorTextEl = document.querySelector(".error__text");
const jobDetailsEl = document.querySelector(".job-details");
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector(".job-list--bookmarks");
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(
  ".pagination__number--next"
);
const paginationNumberBackEl = document.querySelector(
  ".pagination__number--back"
);
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(
  ".sorting__button--relevant"
);
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

// SEARCH Component
const submitHandler = (e) => {
  // prevent default behaviour
  e.preventDefault();

  // search text
  const searchText = searchInputEl.value;

  // validation (regulary expression example)
  const forbiddenPattern = /python/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    errorTextEl.textContent = "Please enter a valid search term";
    errorEl.classList.add("error--visible");
    setTimeout(() => {
      errorEl.classList.remove("error--visible");
    }, 3500);
  }

  // blur input
  searchInputEl.blur();
  // render spinner
  spinnerSearchEl.classList.add("spinner--visible");

  // fetch search results
  fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
    .then((res) => {
      if (!res.ok) {
        console.log("Something went wrong");
        return;
      }
      return res.json();
    })
    .then((data) => {
      // extract data
      const { jobItems } = data;

      // remove the spinner
      spinnerSearchEl.classList.remove("spinner--visible");

      // render the job list
      numberEl.textContent = jobItems.length;

      // render jonitems in the list
      const newJobItemHTML = `
      <li class="job-item">
      <a class="job-item__link" href="${jobItems[4].id}">
          <div class="job-item__badge">${jobItems[4].id}</div>
          <div class="job-item__middle">
              <h3 class="third-heading">Full-Stack Developer</h3>
              <p class="job-item__company">LakeOperations</p>
              <div class="job-item__extras">
                  <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> Full-Time</p>
                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> $80,000+</p>
                  <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> Global</p>
              </div>
          </div>
          <div class="job-item__right">
              <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
              <time class="job-item__time">Thu</time>
          </div>
      </a>
  </li>`;
    })
    .catch((err) => {
      console.log(err);
    });
};

searchFormEl.addEventListener("submit", submitHandler);
