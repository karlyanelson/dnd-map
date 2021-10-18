import DATA_STORE from "../globals/store";

export default function removeAllCharacters(buttonTarget, cancel) {
  if (cancel) {
    let removeBtn = document.querySelector("#removeAllBtn");
    let warning = document.querySelector("#removeAllWarning");

    warning.remove();
    buttonTarget.remove();

    removeBtn.textContent = "Remove All Characters";
    removeBtn.setAttribute("remove-confirmed", "false");
    removeBtn.focus();
  } else {
    if (buttonTarget.getAttribute("remove-confirmed") === "false") {
      let warning = document.createElement("p");
      warning.textContent = "Are you sure you want to remove all characters?";
      warning.setAttribute("role", "alert");
      warning.classList = "mb-4 dark:text-error text-error-dark";
      warning.id = "removeAllWarning";

      let cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList = "button-outline mr-2";
      cancelBtn.id = "removeAllCancelBtn";

      buttonTarget.before(warning);
      buttonTarget.before(cancelBtn);

      buttonTarget.textContent = "Remove All";
      buttonTarget.setAttribute("remove-confirmed", "true");
    } else {
      DATA_STORE.data.characters = [];
    }
  }
}
