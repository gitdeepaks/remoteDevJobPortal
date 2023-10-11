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

const submitHandler = (e) => {
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
  //   spinnerSearchEl.classList.add("spinner--visible");

  // fetch search results
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
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
      renderSpinner("search");
      // render the job list
      numberEl.textContent = jobItems.length;

      // render job items in the list
      renderJobList(jobItems);
    })
    .catch((err) => {
      console.log(err);
    });
};

searchFormEl.addEventListener("submit", submitHandler);
