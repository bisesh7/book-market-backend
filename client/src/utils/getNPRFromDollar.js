// Creating number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NPR",
});

//   Converting dollar to npr
export const getNPRFromDollar = (dollar) => {
  return formatter.format(dollar * 116);
};
