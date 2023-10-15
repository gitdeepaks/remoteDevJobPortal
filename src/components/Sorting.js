import {
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  state,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationBtn from "./Pagination.js";

const clickHandler = (e) => {
  // get the clicked element
  const clickedbtnEl = e.target.closest(".sorting__button");
  // stop funtion if clicked element is not a button
  if (!clickedbtnEl) return;

  // update state(reset to page 1)
  state.currentPage = 1;

  // check if intention is recent or relevent
  const recent = clickedbtnEl.className.includes("--recent") ? true : false;

  // make sorting button active
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  // sort job items
  if (recent) {
    // sort by recent
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return a.relevanceScore - b.relevanceScore;
    });
  }

  // reset pagination buttons
  renderPaginationBtn();

  // render job list
  renderJobList();
};
sortingEl.addEventListener("click", clickHandler);
