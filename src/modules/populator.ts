let template = document.querySelector("[template]") as HTMLTemplateElement,
  list = document.querySelector("[list]") as HTMLElement;

export class populator {
  static populate(newItem: any) {
    // Object Cloning
    let li = template.content.cloneNode(true),
      type = (<Element>li).querySelector("[type]") as HTMLElement,
      description = (<Element>li).querySelector("[description]") as HTMLElement,
      amount = (<Element>li).querySelector("[amount]") as HTMLElement;

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
