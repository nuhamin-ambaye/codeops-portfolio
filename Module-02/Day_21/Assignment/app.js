"use strict";
const phonePattern = /^(?:\+251|0)9\d{8}$/;
const form = document.getElementById("sign-in");
const fullNameInput = document.getElementById("full_name");
const phoneNumberInput = document.getElementById("phone_number");
const errorMsgArea = document.getElementById("error-message");
const currentCountArea = document.getElementById("current-count");

// 5. Restoration
let savedData = localStorage.getItem("users");
let users = [];

if (savedData) {
  users = JSON.parse(savedData);
}

currentCountArea.textContent = "Current Count: " + users.length;

// 1. Submission Control and displaying
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let nameValue = fullNameInput.value.trim();
  let phoneValue = phoneNumberInput.value.trim();
  console.log("Submitted Name:", nameValue);
  console.log("Submitted Phone:", phoneValue);

  // 2. Validation
  if (nameValue.length < 2) {
    // 3. Feedback
    errorMsgArea.textContent = "Name must be at least two characters long.";
    return;
  }

  // 2. Validation
  if (!phonePattern.test(phoneValue)) {
    // 3. Feedback
    errorMsgArea.textContent =
      "Please enter a valid Ethiopian phone number (e.g., 0911223344 or +251911223344).";
    return;
  }

  errorMsgArea.textContent = "";

  // 4. Persistence
  let newUser = {
    name: nameValue,
    phone: phoneValue,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  form.reset();
  console.log("Current user count:", users.length);  
});