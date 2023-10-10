// render errorfunction
import { errorTextEl, errorEl } from "../common.js";

const renderError = (message) => {
  errorTextEl.textContent = message;
  errorEl.classList.add("error--visible");
  setTimeout(() => {
    errorEl.classList.remove("error--visible");
  }, 3500);
};

export default renderError;
