const getTotalPrice = (price, quantity) =>
  "合計金額は" + (price * quantity) + "円です";

const addTax = (total) => Math.floor(total * 1.1);

const totalMessage = getTotalPrice(1000, 2);
const total = Number(totalMessage.match(/\d+/)?.[0]);

console.log("税抜金額は" + total + "円です");

const taxedTotal = addTax(total);
console.log("税込金額は" + taxedTotal + "円です");
