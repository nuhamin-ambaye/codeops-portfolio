# TeleBirr Transaction Report

A modular JavaScript application that processes and reports on TeleBirr transaction data using modern ES6+ features (`map`, `filter`, `reduce`, destructuring, and spread syntax).

## Module Responsibilities

* **`transactions.js`**: Contains and exports the raw transaction dataset.
* **`report.js`**: Houses utility functions to process data, including `totalByType` (calculates debit/credit totals using `filter` and `reduce`) and `formatReceipts`.
* **`app.js`**: The main entry point that imports data and functions from `transactions.js` and `report.js` to execute and display the final outputs.