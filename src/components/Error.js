// render errorfunction
import { errorTextEl, errorEl, DEFAULT_DIPLAY_TIME } from "../common.js";

const renderError = (message) => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, DEFAULT_DIPLAY_TIME);
};

export default renderError;
