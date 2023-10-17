import {
  jobDetailsContentEl,
  BASE_API_URL,
  getData,
  state,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";

const loadHashHandler = async () => {
  // get the id from URL
  const id = window.location.hash.substring(1);

  if (id) {
    jobDetailsContentEl.innerHTML = "";

    //add spinner
    renderSpinner("job-details");

    try {
      document
        .querySelectorAll(".job-item--active")
        .forEach((jobItemWithActiveClass) =>
          jobItemWithActiveClass.classList.remove("job-item--active")
        );
      // fetch job details
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // remove the spinner
      renderSpinner("job-details");

      const { jobItem } = data;

      // update state
      state.activeJobItem = jobItem;

      // render search job list
      renderJobList(state.searchedJobs);

      // render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHashHandler);
window.addEventListener("hashchange", loadHashHandler);
