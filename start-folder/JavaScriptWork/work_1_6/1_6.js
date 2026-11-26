function makeCoffee() {
  console.log("☕ スタッフ：先にコーヒーを準備します...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ コーヒーができました！");
      resolve();
    }, 2000); // 2秒
  });
}

function makeSandwich() {
  console.log("🥪 スタッフ：次にサンドイッチを準備します...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ サンドイッチができました！");
      resolve();
    }, 3000); // 3秒
  });
}

console.log("🥪 お客さんがコーヒーとサンドイッチを注文しました");

Promise.all([makeCoffee(), makeSandwich()]).then(() => {
  console.log("🍽️ スタッフ：すべてできたので配膳します！");
});
