import { transactions, updatedTransaction } from "./transactions.js";
import { totalByType, formatReceipts } from "./report.js";

console.log(`Debits: ${totalByType(transactions, "debit")} ETB`);
console.log(`Credits: ${totalByType(transactions, "credit")} ETB`);

console.log("Formatted Receipts:");
console.log(formatReceipts(transactions));

console.log("Original Transaction:", transactions[0]);
console.log("Updated Transaction:", updatedTransaction);