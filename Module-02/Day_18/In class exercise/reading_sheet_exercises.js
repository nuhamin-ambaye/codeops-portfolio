// 1. Map, filter and reduce

const prices = [250, 600, 180, 1200, 450];

const totalUnder1000 = prices
  .map((p) => p * 1.15)
  .filter((p) => p < 1000)
  .reduce((sum, p) => sum + p, 0);

console.log(totalUnder1000);

// 2. Building customer object

const customerr = {
  name: "Almaz Bekele",
  city: "Addis Ababa",
  balance: 1500
};

for (const [key, value] of Object.entries(customerr)) {
  console.log(`${key}: ${value}`);
}

// 3. Destructing and parameter destructing

const customeer = {
  name: "Almaz Bekele",
  city: "Addis Ababa",
  balance: 1500
};

const { name, city } = customeer;

function greet({ name }) {
  return `Selam, ${name}!`;
}

console.log(greet(customeer));

// 4. Updating with spread

const custoomer = {
  name: "Almaz Bekele",
  city: "Addis Ababa",
  balance: 1500
};

const updatedCustoomer = {
  ...custoomer,
  city: "Hawassa",
  phone: "0912345678"
};

console.log(updatedCustomer);
console.log(custoomer);

// 5. Spliting program (money.js and app.js)

// Since they have to be in a separate file, I put them here in this folder.