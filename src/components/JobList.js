import {
  jobDetailsContentEl,
  jobListSearchEl,
  BASE_API_URL,
  getData,
  state,
  RESULT_PER_PAGE,
  jobListBookmarksEl,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = (whichJobList = "search") => {
  //determine correct selector for jobListEl
  const jobListEl =
    whichJobList === "search" ? jobListSearchEl : jobListBookmarksEl;

  // remove previous job items

  jobListSearchEl.innerHTML = "";

  // determine the job items that should be rendered
  let jobItems;

  if (whichJobList === "search") {
    jobItems = state.searchJobItems.slice(
      state.currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
      state.currentPage * RESULT_PER_PAGE
    );
  } else if (whichJobList === "bookmarks") {
    jobItems = state.bookmarkJobItems;
  }

  // display the number of job items

  state.searchJobItems;
  jobItems.forEach((jobItem) => {
    const newJobItemHTML = `
      <li class="job-item ${
        state.activeJobItem.id === jobItem.id ? "job-item--active" : ""
      }">
      <a class="job-item__link" href="${jobItem.id}">
          <div class="job-item__badge">${jobItem.badgeLetters}</div>
          <div class="job-item__middle">
              <h3 class="third-heading">${jobItem.company}</h3>
              <p class="job-item__company">LakeOperations</p>
              <div class="job-item__extras">
                  <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${
                    jobItem.duration
                  }</p>
                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${
                    jobItem.salary
                  }</p>
                  <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${
                    jobItem.location
                  }</p>
              </div>
          </div>
          <div class="job-item__right">
              <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
              <time class="job-item__time">${jobItem.daysAgo}d</time>
          </div>
      </a>
  </li>`;
    jobListEl.insertAdjacentHTML("beforeend", newJobItemHTML);
  });
};

const clickHandler = async (e) => {
  e.preventDefault();

  // get clicked job item element
  const jobItemEl = e.target.closest(".job-item");

  document
    .querySelectorAll(".job-item--active")
    .forEach((jobItemWithActiveClass) =>
      jobItemWithActiveClass.classList.remove("job-item--active")
    );

  // add an actiive class
  jobItemEl.classList.add("job-item--active");
  // empty the job details content
  jobDetailsContentEl.innerHTML = "";

  // render spinner
  renderSpinner("job-details");

  //get the data id
  const id = jobItemEl.children[0].getAttribute("href");

  // update the state
  state.activeJobItem = state.searchJobItems.find(
    (jobItem) => jobItem.id === +id
  );

  // add id to url
  history.pushState(null, "", `/#${id}`);

  try {
    // fetch job details
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);

    //extract data from job details
    const { jobItem } = data;

    // remove the spinner
    renderSpinner("job-details");
    // render the job details
    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner("job-details");
    renderError(error.message);
  }
};
jobListSearchEl.addEventListener("click", clickHandler);
jobListBookmarksEl.addEventListener("click", clickHandler);

export default renderJobList;
