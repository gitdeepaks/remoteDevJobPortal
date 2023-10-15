import {
  searchInputEl,
  state,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
  getData,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";
import renderPaginationBtn from "./Pagination.js";

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

  // reset sorting buttons
  sortingBtnRelevantEl.classList.remove("sorting__button--active");
  sortingBtnRecentEl.classList.add("sorting__button--active");

  // render spinner
  renderSpinner("search");

  // fetch search results

  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    // extract the data
    const { jobItems } = data;

    // update the state
    state.searchJobItems = jobItems;
    state.currentPage = 1;

    // remove the spinner
    renderSpinner("search");
    // render the job list
    numberEl.textContent = jobItems.length;

    // rset pagination buttons
    renderPaginationBtn();

    // render job items in the list
    renderJobList();
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};

searchFormEl.addEventListener("submit", submitHandler);
