import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

const submitHandler = async (e) => {
  // prevent default behaviour
  e.preventDefault();

  // search text
  const searchText = searchInputEl.value;

  // validation (regulary expression example)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("Please enter a valid search term");
    return;
  }

  // blur input
  searchInputEl.blur();

  //remove previous search results
  jobListSearchEl.innerHTML = "";
  // render spinner
  renderSpinner("search");

  // fetch search results

  try {
    const res = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { jobItems } = data;
    // remove the spinner
    renderSpinner("search");
    // render the job list
    numberEl.textContent = jobItems.length;

    // render job items in the list
    renderJobList(jobItems);
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
