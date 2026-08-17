export const totalByType = (tran, type) => {
  return tran
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);
};

export const formatReceipts = (tran) => {
  return tran.map(({ customer, amount }) => `${customer}: ${amount} ETB`);
};