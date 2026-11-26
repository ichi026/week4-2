let wantApple = 4;
let stockApple = 3;

if (wantApple <= stockApple) {
  console.log("希望通りカートに入れます。");
} else {
  console.log("在庫が足りません。在庫分だけカートに入れます。");
}

const appleCount = Math.min(wantApple, stockApple);
const outputLines = [];
const log = (message) => {
  console.log(message);
  outputLines.push(message);
};

let i = 0;
while (i < appleCount) {
  log("りんごをカートに追加しました");
  i++;
}

for (let j = 1; j <= appleCount; j++) {
  log(`リンゴを買うのは${j}回目の処理です`);
}

log(`合計で${appleCount}回処理しました`);

if (typeof document !== "undefined") {
  document.querySelector("#output").textContent = outputLines.join("\n");
}
