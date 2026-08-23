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

        if (cartErrorMsgArea) {
            cartErrorMsgArea.textContent = "";
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

const cartErrorMsgArea = document.getElementById("cart-error-message");

const checkoutBtn = document.querySelector("#checkout-btn");
const checkoutFormContainer = document.querySelector("#checkout-form");
const orderForm = document.querySelector("#form");

const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
const phoneInput = document.getElementById("pnumber");
const emailInput = document.getElementById("email");

const fnameError = document.getElementById("fname-error");
const lnameError = document.getElementById("lname-error");
const pnumberError = document.getElementById("pnumber-error");
const emailError = document.getElementById("email-error");

const PHONE_PATTERN = /^(?:\+251|0)9\d{8}$/;
const EMAIL_PATTERN = /^[\w.]+@[\w.]+\.\w+$/;

const successModal = document.querySelector("#success-modal");
const modalCloseBtn = document.querySelector("#modal-close-btn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        if (state.cart.length === 0) {
            if (cartErrorMsgArea) {
                cartErrorMsgArea.textContent = "Add some dishes first.";
            }
            return;
        }

        if (cartErrorMsgArea) {
            cartErrorMsgArea.textContent = "";
        }

        if (checkoutFormContainer) {
            checkoutFormContainer.style.display = "block";
        }
    });
}

if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        fnameError.textContent = "";
        lnameError.textContent = "";
        pnumberError.textContent = "";
        emailError.textContent = "";

        const fnameValue = fnameInput.value.trim();
        const lnameValue = lnameInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const emailValue = emailInput.value.trim();
        let isValid = true;

        if (fnameValue.length < 2) {
            fnameError.textContent = "First name must be atleast 2 characters long.";
            isValid = false;
        }

        if (lnameValue.length < 2) {
            lnameError.textContent = "Last name must be atleast 2 characters long.";
            isValid = false;
        }

        if (!PHONE_PATTERN.test(phoneValue)) {
            pnumberError.textContent = "Enter a valid Ethiopian phone number<br>(e.g., 0912345678 or +251912345678).";
            isValid = false;
        }

        if (!EMAIL_PATTERN.test(emailValue)) {
            emailError.textContent = "Enter a valid email address.";
            isValid = false;
        }

        if (!isValid) return;
        
        if (cartErrorMsgArea) cartErrorMsgArea.textContent = "";

        alert("Order Successful!\n\nYour delicious Ethiopian meal is on its way. Thank you for ordering with Addis Eats!");

        state.cart = [];
        save();
        renderCart();

        orderForm.reset();
        if (checkoutFormContainer) {
            checkoutFormContainer.style.display = "none";
        }
    });
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