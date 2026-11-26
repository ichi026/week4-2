const form = document.querySelector("#github-search-form");
const typeSelect = document.querySelector("#search-type");
const queryInput = document.querySelector("#search-query");
const status = document.querySelector("#search-status");
const results = document.querySelector("#search-results");
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  if (!query) {
    setStatus("検索キーワードを入力してください。", "error");
    queryInput.focus();
    return;
  }

  results.replaceChildren();
  setStatus("GitHubを検索しています…");
  submitButton.disabled = true;

  try {
    const kind = typeSelect.value;
    const endpoint = kind === "users" ? "users" : "repositories";
    const url = new URL(`https://api.github.com/search/${endpoint}`);
    url.searchParams.set("q", query);
    url.searchParams.set("per_page", "10");
    const response = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" }
    });

    if (response.status === 403 || response.status === 429) {
      throw new Error("GitHub APIの検索回数上限に達しました。しばらく待ってからもう一度お試しください。");
    }
    if (!response.ok) {
      throw new Error("検索に失敗しました。時間をおいて再度お試しください。");
    }

    const data = await response.json();
    if (data.items.length === 0) {
      setStatus("一致する結果が見つかりませんでした。");
      return;
    }

    const fragment = document.createDocumentFragment();
    data.items.forEach((item) => fragment.append(createResult(item, kind)));
    results.append(fragment);
    setStatus(`${data.total_count.toLocaleString("ja-JP")}件中、先頭の${data.items.length}件を表示しています。`);
  } catch (error) {
    setStatus(error instanceof TypeError
      ? "GitHubに接続できませんでした。ネットワークを確認して再度お試しください。"
      : error.message, "error");
  } finally {
    submitButton.disabled = false;
  }
});

function createResult(item, kind) {
  const listItem = document.createElement("li");
  listItem.className = "search-result";
  const heading = document.createElement("h3");
  const link = document.createElement("a");
  link.href = item.html_url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = kind === "users" ? `@${item.login}` : item.full_name;
  heading.append(link);
  listItem.append(heading);

  if (kind === "users") {
    const avatar = document.createElement("img");
    avatar.className = "search-result-avatar";
    avatar.src = item.avatar_url;
    avatar.alt = "";
    avatar.loading = "lazy";
    const details = document.createElement("p");
    details.className = "search-result-meta";
    details.textContent = "GitHubユーザーページを開きます。";
    listItem.prepend(avatar);
    listItem.append(details);
  } else {
    const description = document.createElement("p");
    description.textContent = item.description || "説明は登録されていません。";
    const details = document.createElement("p");
    details.className = "search-result-meta";
    details.textContent = `★ ${item.stargazers_count.toLocaleString("ja-JP")} · ${item.language || "言語未設定"} · ${item.owner.login}`;
    listItem.append(description, details);
  }
  return listItem;
}

function setStatus(message, state = "") {
  status.textContent = message;
  if (state) status.dataset.state = state;
  else delete status.dataset.state;
}
