// 1. Default parameter and return arrow

// Default parameter
function vat(amount, rate = 0.15) {
  return amount * (1 + rate);
}

// Equivalent arrow function with implicit return
const vatArrow = (amount, rate = 0.15) => amount * (1 + rate);

// 2. makeCounter closure

function makeCounter() {
  let count = 0;
  return () => ++count;
}

const next = makeCounter();
console.log(next());
console.log(next());
console.log(next());

// 3. discountBy factory

function discountBy(rate) {
  return (price) => price * (1 - rate);
}

const memberPrice = discountBy(0.1);
const salePrice = discountBy(0.3);

console.log(memberPrice(1000));
console.log(salePrice(1000));

// 4. applyToAll HOF

function applyToAll(list, fn) {
  const result = [];
  for (const item of list) {
    result.push(fn(item));
  }
  return result;
}

const prices = [100, 200, 300];
const addVat = (p) => p * 1.15;

const pricesWithVat = applyToAll(prices, addVat);
console.log(pricesWithVat);

// 5. Printing Ethiopian cities by forEach

const cities = ["Addis Ababa", "Hawassa", "Dire Dawa", "Bahir Dar"];

cities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});