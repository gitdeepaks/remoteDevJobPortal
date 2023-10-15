import {
  state,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
  RESULT_PER_PAGE,
} from "../common.js";

import renderJobList from "./JobList.js";
const renderPaginationBtn = () => {
  // displayback button if current we are on page 2 or more
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }
  // display next button if there are more pages
  if (state.currentPage < state.searchJobItems.length / RESULT_PER_PAGE) {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  }

  // update page numbers
  paginationBtnNextEl.textContent = state.currentPage + 1;
  paginationBtnBackEl.textContent = state.currentPage - 1;

  // unfocus the next button if we are on the last page
  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

const clickHandler = (e) => {
  // get clkicked
  const clickedBtnEl = e.target.closest(".pagination__button");
  //stop function if null
  if (!clickedBtnEl) return;

  // check if intension is next or back
  const nextPage = clickedBtnEl.className.includes("--next") ? true : false;

  // update state
  nextPage ? state.currentPage++ : state.currentPage--;

  // render pagination buttons
  renderPaginationBtn();

  // render job items for that page
  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationBtn;
