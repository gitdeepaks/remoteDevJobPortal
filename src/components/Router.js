import { jobDetailsContentEl, BASE_API_URL, getData } from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const loadHashHandler = async () => {
  // get the id from URL
  const id = window.location.hash.substring(1);

  if (id) {
    jobDetailsContentEl.innerHTML = "";

    //add spinner
    renderSpinner("job-details");

    try {
      // fetch job details
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // remove the spinner
      renderSpinner("job-details");

      const { jobItem } = data;

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
