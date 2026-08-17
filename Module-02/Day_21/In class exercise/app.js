// 1. Adding theme toggle

const themeSelect = document.querySelector("#theme");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) themeSelect.value = savedTheme;
themeSelect.addEventListener("change", () => {
    localStorage.setItem("theme", themeSelect.value);
});

// 2. Stringifying and parsing array

function save(data) {
    localStorage.setItem("items", JSON.stringify(data));
}

function load() {
    try {
        const raw = localStorage.getItem("items");
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        return [];
    }
}

// 3. Building signup form

const form = document.querySelector("#signup");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorMsg = document.querySelector("#error");

// 4. Ethiopian phone regex
const PHONE = /^(?:\+251|0)9\d{8}$/;


function validate(name, phone) {
    if (name.length < 2) return "Name must be at least 2 characters long.";
    if (!PHONE.test(phone)) return "Enter a valid Ethiopian phone number.";
    return "";
}

// 6. On success
const countDisplay = document.querySelector("#count");
let users = load();

function updateCount() {
    if (countDisplay) {
        countDisplay.textContent = `Signups: ${users.length}`;
    }
}

updateCount();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

// 5. Showing error message

    const error = validate(name, phone);
    if (error) {
        errorMsg.textContent = error;
        return;
    }

    errorMsg.textContent = "";
    users.push({ name, phone });
    save(users);
    form.reset();
    updateCount();
});