let template = document.querySelector("[template]"), list = document.querySelector("[list]");
export class populator {
    static populate(newItem) {
        // Object Cloning
        let li = template.content.cloneNode(true), type = li.querySelector("[type]"), description = li.querySelector("[description]"), amount = li.querySelector("[amount]");
        // Values Assignment
        type.innerHTML =
            newItem.type == "Income"
                ? `<p class="text-success">${newItem.type}</p>`
                : `<p class="text-danger">${newItem.type}</p>`;
        description.innerText = newItem.description;
        amount.innerText = `${newItem.amount} PKR`;
        list.appendChild(li);
    }
}
//# sourceMappingURL=populator.js.map