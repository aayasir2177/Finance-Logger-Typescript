// Importing Modules
import { populator } from "./modules/populator.js";
import { objectConstructor } from "./modules/object-constructor.js";
// Getting All Necessary Elements
let type = document.querySelector("[type]"), description = document.querySelector("[description]"), amount = document.querySelector("[amount]"), addBtn = document.querySelector("[add-button]");
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
    }
    else {
        alert("Pelase fill all fields!");
    }
}
// Constructing Objects
let construct = () => {
    return new objectConstructor(type.value, description.value, parseInt(amount.value));
};
//# sourceMappingURL=app.js.map