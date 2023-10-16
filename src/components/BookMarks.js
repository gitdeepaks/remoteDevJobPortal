import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = async (e) => {
  if (!e.target.className.includes("bookmark")) return;

  // update the state
  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  // add active class to the bookmark button
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

const mouseEnterHandler = () => {
  // make bookmarks button active
  bookmarksBtnEl.classList.add("bookmarks-btn--active");

  // make joblist visible
  jobListBookmarksEl.classList.add("job-list--visible");

  // render bookmark job list
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  // make bookmarks button inactive
  bookmarksBtnEl.classList.remove("bookmarks-btn--active");

  //make joblist invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);

bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);

jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
