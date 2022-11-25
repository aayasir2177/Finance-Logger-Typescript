// Importing Modules
import { populator } from "./modules/populator.js";
import { objectConstructor } from "./modules/object-constructor.js";

// Getting All Necessary Elements
let type = document.querySelector("[type]") as HTMLSelectElement,
  description = document.querySelector("[description]") as HTMLInputElement,
  amount = document.querySelector("[amount]") as HTMLInputElement,
  addBtn = document.querySelector("[add-button]") as HTMLButtonElement;

addBtn.addEventListener("click", formValidator);
document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    formValidator();
  }
});

function formValidator() {
  // Validating Form
  if (description.value !== "" && amount.value !== "") {
    let newItem = construct();

    // Populating Objects
    populator.populate(newItem);

    // Re-evaluating Fields
    (type.value = "Income"), (description.value = ""), (amount.value = "");
  } else {
    alert("Pelase fill all fields!");
  }
}

// Constructing Objects
let construct = () => {
  return new objectConstructor(
    type.value,
    description.value,
    parseInt(amount.value)
  );
};
