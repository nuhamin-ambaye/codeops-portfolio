// function declaration

// function register(name, age){
//     return `Your name '${name}' and age '${age}' are registered.`
// };

// console.log(register('Abera', 30));

// arrow function

// const register = (namee, agee) => {return `Your name '${namee}' and age '${agee}' are registered.`;}
// console.log(register('Abera', 30));

// closure function

// function outer(item){
//     return function inner(amount){
//         return `You have purchased ${amount} amount of ${item}s.`
//     };
// }

// const purchased = outer(item);
// purchased(pen);

// callback function

// function adder(n1, n2, callback) {
//   return callback(n1, n2);
// }

// function subtractor(n1, n2) {
//   return n1 - n2;
// }

// console.log(35, 24, subtractor);

// Until here they are my practice codes

// And these are day 17's codes

// function addVat(amount) {
//     return amount * 1.15;   // 15% VAT
// }

// call many times
// console.log(addVat(480));    // 552
// console.log(addVat(1000));   // 1150

// declaration - hoisted, callable above
// greet(); // works
// function greet() {
//   return "Selam!";
// }

// expression - NOT hoisted
// const greeet = function () {
//   return "Selam!";
// };
// greeet(); // call AFTER the line

// default value when none passed
// function deliveryFee(total, rate = 0.05) {
//     return total * rate;
// }
// deliveryFee(1000); // 50 (uses 0.05)
// deliveryFee(1000, 0.10); // 100

// rest - collect many args into an array
// function totalBill( ... prices) {
//     let sum = 0;
//     for (const p of prices) sum += p;
//     return sum;
// }
// totalBill(120, 200, 160); // 480

// normal expression
// const vat = function (n) {
//   return n * 0.15;
// };

// arrow — same thing, shorter
// const vat = (n) => { return n * 0.15; };

// one expression → implicit return
// const vat = n => n * 0.15;

// vat(480); // 72

// function makeGreeter(city) {
// inner function "closes over" city
// return function (name) {
//     return `Selam ${name}, from ${city}`;
// };
// }
// const addis = makeGreeter("Addis Ababa");
// addis("Almaz"); // "Selam Almaz, from..."

// function makeQueue() {
//     let number = 0; // private
//     return {
//         next() { number++; return number; },
//         current() { return number; },
//     };
// }
// const bank = makeQueue(); // CBE counter
// bank.next(); // 1 (Almaz)
// bank.next(); // 2 (Dawit)
// bank.current(); // 2

// for (var i = 1; i <= 3; i++) {
//     setTimeout(() => console.log(i), 0);
// }
// prints 4, 4, 4 — surprising!

// for (let i = 1; i <= 3; i++) {
//     setTimeout(() => console.log(i), 0);
// }
// prints 1, 2, 3 ✓
// let gives each turn its own i

// function once(fn) {
//     let called = false; // private flag
//     return function (...args) {
//         if (called) return;
//         called = true;
//         return fn(...args);
//     };
// }
// const pay = once(submitPayment);
// pay(); // runs pay(); // ignored

// store a function in a variable
// const vat = n => n * 0.15;

// put functions in an array
// const ops = [vat, n => n * 2];

// pass one as an argument → next slide
// apply(480, vat);

// "do something to each item"
// function forEachPrice(prices, action) {
//     for (const p of prices) {
//         action(p); // call what we got
//     }
// }
// forEachPrice([120, 200, 160], price => {
//     console.log(`${price} ETB`);
// });

// build a custom discounter
// function discountBy(percent) {
//     return price => price * (1 - percent);
// }
// const member = discountBy(0.10); // 10%
// const sale = discountBy(0.25); // 25%
// member(1000); // 900
// sale(1000); // 750

// small, single-purpose pieces
// const addVat = n => n * 1.15;
// const addService = n => n + 30;
// const toETB = n => `${n.toFixed(2)} ETB`;
// run them in sequence
// const pipe = (...fns) => x =>
//     fns.reduce((acc, fn) => fn(acc), x);
// const checkout = pipe(addVat, addService, toETB);
// checkout(480); // "582.00 ETB"
