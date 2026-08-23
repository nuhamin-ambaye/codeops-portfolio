const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#add-form input[type='text']");
const priceInput = document.querySelector("#add-form input[type='number']");
const list = document.querySelector("#list");
const totall = document.querySelector("#total");

function updateTotal() {
    let total = 0;
    const items = list.querySelectorAll("li");
    
    items.forEach(function(item) {
        total = total + Number(item.dataset.price);
    });
    
    totall.textContent = total;
}

function addRow(n, p) {
    const li = document.createElement("li");
    li.dataset.price = p;
    li.textContent = n + " - " + p + " ETB ";
    
    const delBtn = document.createElement("button");
    delBtn.textContent = "x";
    delBtn.classList.add("del");
    
    li.append(delBtn);
    list.append(li);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const n = nameInput.value.trim();
    const p = Number(priceInput.value);
    
    if (!n || !p) return;
    
    addRow(n, p);
    form.reset();
    updateTotal();
});

list.addEventListener("click", (e) => {
    if (e.target.matches(".del")) {
        e.target.closest("li").remove();
        updateTotal();
    } else {
        const li = e.target.closest("li");
        if (li) {
            li.classList.toggle("bought");
        }
    }
});