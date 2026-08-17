export const transactions = [
  { id: 1, customer: "Almaz", amount: 250, type: "debit" },
  { id: 2, customer: "Dawit", amount: 600, type: "credit" },
  { id: 3, customer: "Sara", amount: 180, type: "debit" },
];

export const updatedTransaction = {
  ...transactions[0],
  amount: 300,
};