const state = {
    dishes: [],
    cart: [],
    search: ""
};

const menuEl = document.querySelector("#menu");
const cartEl = document.querySelector("#cart");
const searchEl = document.getElementById("search bar");

// Fetch data from data.json
async function loadMenu() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        state.dishes = data;
        render();
    } catch (error) {
        console.error("There was a problem while loading the JSON File:", error);
    }
}

// Render dynamic UI based on current state
function render() {
    renderMenu();
    renderCart();
}

// Render Menu Cards matching HTML structural layout
function renderMenu() {
    if (!menuEl) return;
    menuEl.innerHTML = "";

    const filteredDishes = state.dishes.filter(dish =>
        dish.name.toLowerCase().includes(state.search.toLowerCase())
    );

    filteredDishes.forEach(dish => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.dataset.id = dish.id;

        card.innerHTML = `
            <div class="tags">
                <span class="gray-badge">${dish.category}</span>
                ${dish.spicy ? '<span class="red-badge">Spicy</span>' : ''}
            </div>
            <div>
                <h3>${dish.name}</h3>
                <p>${dish.description || 'Authentic Ethiopian dish prepared with quality ingredients.'}</p>
                <h3 class="price">${dish.price} ETB</h3>
                <button class="order-btn">Order</button>
            </div>
        `;
        menuEl.appendChild(card);
    });
}

// Render Cart matching HTML <dl class="ur-order"> structure
function renderCart() {
    if (!cartEl) return;

    const total = cartTotal();

    cartEl.innerHTML = `
        <h2>Your order</h2>
        ${state.cart.map(item => `
            <dl class="ur-order" data-id="${item.id}">
                <dt>${item.name}</dt>
                <dd>${item.qty}*${item.price} ETB</dd>
                <button class="remove-btn">Remove</button>
            </dl>
        `).join("")}

        <div id="total">
            <h3 class="total-label">Total:</h3>
            <h3 class="total-price">${total} ETB</h3>
        </div>
        <button id="pay-btn">PAY</button>
    `;
}

// Event Listeners
if (searchEl) {
    searchEl.addEventListener("input", (e) => {
        state.search = e.target.value;
        render();
    });
}

if (menuEl) {
    menuEl.addEventListener("click", (e) => {
        if (!e.target.classList.contains("order-btn")) return;
        const id = Number(e.target.closest(".menu-card").dataset.id);
        const dish = state.dishes.find(d => d.id === id);
        const line = state.cart.find(i => i.id === id);

        if (line) {
            line.qty++;
        } else {
            state.cart.push({ ...dish, qty: 1 });
        }
        save();
        render();
    });
}

if (cartEl) {
    cartEl.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-btn")) return;
        const id = Number(e.target.closest(".ur-order").dataset.id);
        state.cart = state.cart.filter(i => i.id !== id);
        save();
        render();
    });
}

function cartTotal() {
    return state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function save() {
    localStorage.setItem("addiseats", JSON.stringify(state.cart));
}

function load() {
    const s = localStorage.getItem("addiseats");
    if (s) {
        try {
            state.cart = JSON.parse(s);
        } catch (e) {
            state.cart = [];
        }
    }
}

async function init() {
    load();
    await loadMenu();
}

init();