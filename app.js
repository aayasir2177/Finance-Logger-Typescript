// ======================== Classes ========================
// Entry Constructor
class Entry {
  constructor(amount, description, category) {
    this.amount = amount;
    this.description = description;
    this.category = category;
  }
}

// Storage
class Storage {
  static getData() {
    if (localStorage.getItem("entries") === null) {
      const entries = [];
      localStorage.setItem("entries", JSON.stringify(entries));
      return entries;
    } else {
      const entries = JSON.parse(localStorage.getItem("entries"));
      return entries;
    }
  }

  static setData(entries) {
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  static addToArray(amount, description, category) {
    let entries = Storage.getData();

    entries.push(new Entry(amount, description, category));

    Storage.setData(entries);
    UI.populateOnLoad(entries);

    console.log(entries);
  }

  static removeFromArray(index) {
    let entries = Storage.getData();

    entries.splice(index - 1, 1);
    
    Storage.setData(entries);
    UI.populateOnLoad(entries);
  }

  static editFromArray(amountInput, descriptionInput, index) {
    let entries = Storage.getData();

    // Assigning updated values
    entries[index - 1].amount = amountInput;
    entries[index - 1].description = descriptionInput;

    // Deciding category
    entries.forEach((entry) => {
      if (entry.amount < 0) {
        entry.category = "expense";
      } else {
        entry.category = "income";
      }
    });

    Storage.setData(entries);
    UI.populateOnLoad(entries);
  }
}

class Calculation {
  static getIncome() {
    let entries = Storage.getData();

    let totalncome = 0;

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].amount > 0) {
        totalncome += parseInt(entries[i].amount);
      }
    }

    return totalncome;
  }

  static getExpense() {
    let entries = Storage.getData();

    let totalExpense = 0;

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].amount < 0) {
        totalExpense += parseInt(entries[i].amount);
      }
    }

    return totalExpense * -1;
  }

  static getTotalBalance() {
    // let entries = Storage.getData();
    // let totalBalance;
    // totalBalance = entries.reduce((accumulator, entry) => {
    //   return accumulator + parseInt(entry.amount);
    // }, 0);
    // return totalBalance;

    let totalBalance;
    totalBalance = Calculation.getIncome() - Calculation.getExpense();
    return totalBalance;
  }
}

// User Interface
class UI {
  static populateOnLoad(entries) {
    let tableBody = document.querySelector("#table-body"),
      totalIncome = document.querySelector("#total-income"),
      totalExpense = document.querySelector("#total-expense"),
      totalBalance = document.querySelector("#total-balance");

    // Overview Section
    let balance = Calculation.getTotalBalance();
    totalBalance.innerHTML = `${balance} PKR`;

    if (balance > 0) {
      totalBalance.classList.add("text-success");
    } else if (balance < 0) {
      totalBalance.classList.add("text-danger");
    } else {
      totalBalance.classList.remove("text-danger");
      totalBalance.classList.remove("text-success");
    }
    totalIncome.innerHTML = `Total Income: ${Calculation.getIncome()}`;
    totalExpense.innerHTML = `Total Expenses: ${Calculation.getExpense()}`;

    // Table Section
    tableBody.innerHTML = "";

    entries.forEach((entry) => {
      let tr = document.createElement("tr");

      tr.innerHTML = `
            <td class=text-${entry.category === "income" ? "success" : "danger"}
            >
            
            ${entry.category}

            </td>

            <td>

          <input type="text" class="form-control no-border" value= "${
            entry.amount
          }" onkeypress="return isNumberKey(event)" readonly/>           
            
            </td>
            <td>
            <input type="text" class="form-control no-border" value= "${
              entry.description
            }" readonly/> 
            </td>
            <td>
              <button type="button" class="btn btn-outline-dark btn-sm" onclick="editEntry(this)">
                Edit
              </button>
            </td>
            <td>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeEntry(this)">
              Delete
            </button>
          </td>
            `;

      tableBody.appendChild(tr);
    });

    console.log(entries);
  }
}

// ======================== Events ========================
// Populate list on window load
window.onload = () => {
  let entries = Storage.getData();
  UI.populateOnLoad(entries);
};

// Add Entry on Enter
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addEntry();
  }
});

// Add Entry on Click
function addEntry() {
  let amount = document.querySelector("#amount").value,
    description = document.querySelector("#description").value,
    income = document.querySelector("#income").checked,
    category;

  // Category Assigner
  if (income) {
    category = "income";
  } else {
    category = "expense";
  }

  if (amount === "" || description === "") {
    alert("Please fill all the fields!");
  } else {
    let totalBalance = document.querySelector("#total-balance");

    if (income) {
      Storage.addToArray(amount, description, category);
      totalBalance.classList.add("text-sucess");
    } else {
      Storage.addToArray(amount * -1, description, category);
      totalBalance.classList.add("text-danger");
    }

    document.querySelector("#amount").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#expense").checked = true;

  }
}

// Edit Entry on click and save on blur
function editEntry(e) {
  let index = e.parentElement.parentElement.rowIndex;
  let categoryInput =
    e.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling;
  let amountInput =
    e.parentElement.previousElementSibling.previousElementSibling.children[0];
  let descriptionInput = e.parentElement.previousElementSibling.children[0];

  // Allowing user to add data
  amountInput.removeAttribute("readonly");
  descriptionInput.removeAttribute("readonly");

  // Allowing numbers as input only
  amountInput.addEventListener("keypress", function (e) {
    var keycode = e.keyCode ? e.keyCode : e.which;
    if (/[^0-9\-]/.test(String.fromCharCode(keycode))) {
      // a non–digit was entered
      e.preventDefault();
    }
  });

  // Saving data to array on blur
  descriptionInput.onblur = () => {
    amountInput.setAttribute("readonly", true);
    descriptionInput.setAttribute("readonly", true);

    Storage.editFromArray(amountInput.value, descriptionInput.value, index);
  };

  amountInput.onblur = () => {
    amountInput.setAttribute("readonly", true);
    descriptionInput.setAttribute("readonly", true);

    Storage.editFromArray(amountInput.value, descriptionInput.value, index);
  };
}

// Remove Entry on Click
function removeEntry(e) {
  let index = e.parentElement.parentElement.rowIndex;
  Storage.removeFromArray(index);
}
