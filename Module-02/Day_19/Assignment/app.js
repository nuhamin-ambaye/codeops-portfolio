// TODO 1: Holding items in array

let items = [];

// TODO 2: Selecting DOM elements

const form = document.querySelector("#add-form");
const nameIn = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

// TODO 3: Writing the render function to rebuild list from the array

function render() {
  list.innerHTML = "";

  items.forEach((it) => {
    const li = document.createElement("li");
    li.textContent = it.name;
    li.dataset.id = it.id;

    if (it.done) {
      li.classList.add("done");
    }

    const x = document.createElement("button");
    x.textContent = "x";
    x.className = "del";

    li.append(x);
    list.append(li);
  });

  count.textContent = items.length + " items";
}

// TODO 4: Handling the form submission

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameIn.value.trim();
  if (!name) return;

  items.push({
    id: Date.now(),
    name: name,
    done: false,
  });

  nameIn.value = "";
  render();
});

// TODO 5: Setting up the event delegeation

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.matches(".del")) {
    items = items.filter((i) => i.id !== id);
  } else {
    const it = items.find((i) => i.id === id);
    if (it) {
      it.done = !it.done;
    }
  }

  render();
});