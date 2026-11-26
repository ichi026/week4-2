const getTotalPrice = (price, quantity) =>
  "合計金額は" + (price * quantity) + "円です";

const addTax = (total) => Math.floor(total * 1.1);

const totalMessage = getTotalPrice(1000, 2);
const total = Number(totalMessage.match(/\d+/)?.[0]);

const taxExcludedMessage = "税抜金額は" + total + "円です";
console.log(taxExcludedMessage);
if (typeof document !== "undefined") {
  document.querySelector("#tax-excluded").textContent = taxExcludedMessage;
}

const taxedTotal = addTax(total);
const taxIncludedMessage = "税込金額は" + taxedTotal + "円です";
console.log(taxIncludedMessage);
if (typeof document !== "undefined") {
  document.querySelector("#tax-included").textContent = taxIncludedMessage;
}

