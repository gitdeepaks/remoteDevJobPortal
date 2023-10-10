import {
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  jobListSearchEl,
  numberEl,
} from "../common.js";

const submitHandler = (e) => {
  // prevent default behaviour
  e.preventDefault();

  // search text
  const searchText = searchInputEl.value;

  // validation (regulary expression example)
  const forbiddenPattern = /[0-9]/;
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

  //remove previous search results
  jobListSearchEl.innerHTML = "";
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

      jobItems.slice(0, 7).forEach((jobItem) => {
        const newJobItemHTML = `
          <li class="job-item">
          <a class="job-item__link" href="${jobItem.id}">
              <div class="job-item__badge">${jobItem.badgeLetters}</div>
              <div class="job-item__middle">
                  <h3 class="third-heading">${jobItem.company}</h3>
                  <p class="job-item__company">LakeOperations</p>
                  <div class="job-item__extras">
                      <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                      <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                      <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                  </div>
              </div>
              <div class="job-item__right">
                  <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                  <time class="job-item__time">${jobItem.daysAgo}d</time>
              </div>
          </a>
      </li>`;
        jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
      });
      ˀ;
    })
    .catch((err) => {
      console.log(err);
    });
};

searchFormEl.addEventListener("submit", submitHandler);
