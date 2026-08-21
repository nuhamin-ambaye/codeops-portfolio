const state = {
    dishes: [],
    cart: [],
    search: ""
};

const menuEl = document.querySelector("#menu");
const cartItemsEl = document.querySelector("#cart-items");
const totalValEl = document.querySelector("#cart-total-val");
const searchEl = document.getElementById("search-bar");

async function loadMenu() {
    if (!menuEl) return;
    try {
        const response = await fetch('menu.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        state.dishes = data;
        render();
    } catch (error) {
        console.error("Problem loading menu JSON:", error);
        menuEl.innerHTML = "<p>Could not load menu. Please check menu.json.</p>";
    }
}

function render() {
    renderMenu();
    renderCart();
}

function renderMenu() {
    if (!menuEl) return;
    menuEl.innerHTML = "";

    const filteredDishes = state.dishes.filter(dish =>
        dish.name.toLowerCase().includes(state.search.toLowerCase())
    );

    if (filteredDishes.length === 0) {
        menuEl.innerHTML = "<p>No dishes found.</p>";
        return;
    }

    filteredDishes.forEach(dish => {
        const card = document.createElement("article");
        card.className = "menu-card";
        card.dataset.id = dish.id;

        card.innerHTML = `
            <div class="tags">
                <span class="gray-badge">${dish.category}</span>
                ${dish.spicy ? '<span class="red-badge">Spicy</span>' : ''}
            </div>
            <div>
                <h3>${dish.name}</h3>
                <p class="price">${dish.price} ETB</p>
                <button class="order-btn">Order</button>
            </div>
        `;
        menuEl.appendChild(card);
    });
}

function renderCart() {
    const container = cartItemsEl || document.querySelector("#cart");
    if (!container) return;

    if (state.cart.length === 0) {
        if (cartItemsEl) {
            cartItemsEl.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
        }
    } else {
        const itemsHTML = state.cart.map(item => `
            <div class="ur-order" data-id="${item.id}">
                <div>
                    <strong>${item.name || 'Unknown Item'}</strong>
                    <div class="cart-item-qty">${item.qty || 1} × ${item.price || 0} ETB</div>
                </div>
                <button class="remove-btn">Remove</button>
            </div>
        `).join("");

        if (cartItemsEl) {
            cartItemsEl.innerHTML = itemsHTML;
        }
    }

    if (totalValEl) {
        totalValEl.textContent = `${cartTotal()} ETB`;
    } else {
        const fallbackTotal = document.querySelector(".total-price");
        if (fallbackTotal) fallbackTotal.textContent = `${cartTotal()} ETB`;
    }
}

if (searchEl) {
    searchEl.addEventListener("input", (e) => {
        state.search = e.target.value;
        renderMenu();
    });
}

if (menuEl) {
    menuEl.addEventListener("click", (e) => {
        if (!e.target.classList.contains("order-btn")) return;
        
        const card = e.target.closest(".menu-card");
        if (!card) return;

        const id = Number(card.dataset.id);
        const dish = state.dishes.find(d => d.id === id);
        if (!dish) return;

        const line = state.cart.find(i => i.id === id);

        if (line) {
            line.qty++;
        } else {
            state.cart.push({ ...dish, qty: 1 });
        }
        
        save();
        renderCart();
    });
}

const cartEl = document.querySelector("#cart");
if (cartEl) {
    cartEl.addEventListener("click", (e) => {
        if (!e.target.classList.contains("remove-btn")) return;
        
        const itemEl = e.target.closest(".ur-order");
        if (!itemEl) return;

        const id = Number(itemEl.dataset.id);
        const line = state.cart.find(i => i.id === id);

        if (line) {
            if (line.qty > 1) {
                line.qty--;
            } else {
                state.cart = state.cart.filter(i => i.id !== id);
            }
        }
        
        save();
        renderCart();
    });
}

function cartTotal() {
    return state.cart.reduce((sum, i) => sum + ((i.price || 0) * (i.qty || 1)), 0);
}

function save() {
    localStorage.setItem("addiseats", JSON.stringify(state.cart));
}

function load() {
    const s = localStorage.getItem("addiseats");
    if (s) {
        try {
            const parsed = JSON.parse(s);
            if (Array.isArray(parsed)) {
                state.cart = parsed.filter(item => item && item.id && item.name && item.price);
            }
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