export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })
    .format(price)
    .slice(0, -3);
};
