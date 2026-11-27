const STORAGE_KEY = "wisdom-custom-quotes";

const DEFAULT_QUOTES = [
  { text: "자세히 보아야 예쁘다. 오래 보아야 사랑스럽다. 너도 그렇다.", author: "나태주" },
  { text: "하늘을 우러러 한 점 부끄럼이 없기를, 잎새에 이는 바람에도 나는 괴로워했다.", author: "윤동주" },
  { text: "가장 중요한 것은 눈에 보이지 않아.", author: "생텍쥐페리" },
  { text: "혼자서는 작은 일밖에 할 수 없지만, 함께라면 많은 것을 할 수 있다.", author: "헬렌 켈러" },
  { text: "상상력은 지식보다 중요하다.", author: "알베르트 아인슈타인" },
  { text: "당신이 세상에서 보고 싶은 변화가 되어라.", author: "마하트마 간디" },
  { text: "너 자신을 알라.", author: "소크라테스" },
  { text: "배우고 때로 익히면, 또한 기쁘지 아니한가.", author: "공자" },
  { text: "나는 생각한다, 고로 존재한다.", author: "르네 데카르트" },
  { text: "천 리 길도 한 걸음부터.", author: "노자" },
  { text: "성공은 열정을 잃지 않고 실패를 거듭하는 것이다.", author: "윈스턴 처칠" },
  { text: "우리 모두는 시궁창에 있지만, 그중 일부는 별을 바라본다.", author: "오스카 와일드" },
  { text: "용기란 두려움에 맞서는 힘이고, 두려움을 이기는 일이다.", author: "마크 트웨인" },
  { text: "자극과 반응 사이에는 공간이 있다. 그 공간에 우리의 성장과 자유가 있다.", author: "빅터 프랭클" },
  { text: "할 수 있는 일과 할 수 없는 일을 구분하는 것이 지혜의 시작이다.", author: "에픽테토스" },
  { text: "질문들을 살아라. 어쩌면 어느 먼 날에, 그 답을 살게 될 것이다.", author: "라이너 마리아 릴케" },
  { text: "자신이 원하는 것을 아는 사람이 부유하다.", author: "요한 볼프강 폰 괴테" },
  { text: "새는 알에서 나오려고 투쟁한다. 알은 세계다.", author: "헤르만 헤세" },
  { text: "무언가를 간절히 원하면, 온 우주는 그 소망이 이루어지도록 돕는다.", author: "파울로 코엘료" },
  { text: "인생은 가까이서 보면 비극이지만, 멀리서 보면 희극이다.", author: "찰리 채플린" },
];

const quoteEl = document.querySelector("#quote");
const quoteTextEl = document.querySelector("#quote-text");
const quoteAuthorEl = document.querySelector("#quote-author");
const quoteStatusEl = document.querySelector("#quote-status");
const actionStatusEl = document.querySelector("#action-status");
const form = document.querySelector("#add-form");
const textInput = document.querySelector("#quote-input");
const authorInput = document.querySelector("#author-input");
const formErrorEl = document.querySelector("#form-error");
const savedListEl = document.querySelector("#saved-list");
const savedEmptyEl = document.querySelector("#saved-empty");
const savedCountEl = document.querySelector("#saved-count");

let customQuotes = loadCustomQuotes();
let current = null;

function loadCustomQuotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.id === "string" &&
        typeof item.text === "string" &&
        typeof item.author === "string"
    );
  } catch {
    return [];
  }
}

function saveCustomQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customQuotes));
}

function pool() {
  return [
    ...DEFAULT_QUOTES.map((quote) => ({ ...quote, id: null })),
    ...customQuotes,
  ];
}

function pickRandom() {
  const quotes = pool();
  const choices =
    current == null
      ? quotes
      : quotes.filter(
          (quote) => quote.text !== current.text || quote.author !== current.author
        );
  const source = choices.length > 0 ? choices : quotes;
  const index = Math.floor(Math.random() * source.length);
  return source[index];
}

function showQuote(quote) {
  current = quote;
  quoteTextEl.textContent = quote.text;
  quoteAuthorEl.textContent = quote.author;
  quoteStatusEl.textContent = `${quote.author}의 명언. ${quote.text}`;
  quoteEl.classList.remove("is-fresh");
  void quoteEl.offsetWidth;
  quoteEl.classList.add("is-fresh");
}

function nextQuote() {
  showQuote(pickRandom());
  actionStatusEl.textContent = "";
}

function quoteShareText() {
  return `“${current.text}” — ${current.author}`;
}

async function copyQuote() {
  const text = quoteShareText();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    if (!copied) {
      actionStatusEl.textContent = "복사에 실패했습니다. 문장을 직접 선택해 주세요.";
      return;
    }
  }
  actionStatusEl.textContent = "명언을 클립보드에 복사했습니다.";
}

function openTwitterShare() {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteShareText())}`;
  window.open(url, "_blank", "noopener,noreferrer");
  actionStatusEl.textContent = "트위터 공유 창을 열었습니다.";
}

async function shareQuote() {
  const payload = {
    title: "명언 생성기",
    text: quoteShareText(),
  };
  if (navigator.share) {
    try {
      await navigator.share(payload);
      actionStatusEl.textContent = "공유를 완료했습니다.";
      return;
    } catch (error) {
      if (error && error.name === "AbortError") {
        actionStatusEl.textContent = "공유를 취소했습니다.";
        return;
      }
    }
  }
  openTwitterShare();
}

function showFormError(message) {
  formErrorEl.hidden = false;
  formErrorEl.textContent = message;
}

function clearFormError() {
  formErrorEl.hidden = true;
  formErrorEl.textContent = "";
}

function addQuote(text, author) {
  const quote = {
    id: crypto.randomUUID(),
    text,
    author,
  };
  customQuotes = [quote, ...customQuotes];
  saveCustomQuotes();
  renderSaved();
  showQuote(quote);
  actionStatusEl.textContent = "새 명언을 저장하고 화면에 표시했습니다.";
}

function deleteQuote(id) {
  const removed = customQuotes.find((quote) => quote.id === id);
  customQuotes = customQuotes.filter((quote) => quote.id !== id);
  saveCustomQuotes();
  renderSaved();
  if (
    removed &&
    current &&
    current.id === removed.id
  ) {
    nextQuote();
  }
  actionStatusEl.textContent = "저장한 명언을 삭제했습니다.";
}

function renderSaved() {
  savedListEl.replaceChildren();
  savedCountEl.textContent = `${customQuotes.length}개`;
  savedEmptyEl.hidden = customQuotes.length > 0;

  customQuotes.forEach((quote) => {
    const item = document.createElement("li");
    item.className = "saved-item";

    const body = document.createElement("div");
    const text = document.createElement("p");
    text.textContent = quote.text;
    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = quote.author;
    body.append(text, meta);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "btn btn-danger";
    removeBtn.textContent = "삭제";
    removeBtn.setAttribute("aria-label", `${quote.author}의 명언 삭제`);
    removeBtn.addEventListener("click", () => deleteQuote(quote.id));

    item.append(body, removeBtn);
    savedListEl.append(item);
  });
}

function onQuoteKeydown(event) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  nextQuote();
}

document.querySelector("#next-btn").addEventListener("click", nextQuote);
document.querySelector("#copy-btn").addEventListener("click", copyQuote);
document.querySelector("#share-btn").addEventListener("click", shareQuote);
quoteEl.addEventListener("keydown", onQuoteKeydown);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = textInput.value.trim();
  const author = authorInput.value.trim();

  if (!text || !author) {
    showFormError("문구와 저자를 모두 입력해 주세요.");
    (text ? authorInput : textInput).focus();
    return;
  }

  if (text.length > 200 || author.length > 40) {
    showFormError("문구는 200자, 저자는 40자 이하로 입력해 주세요.");
    return;
  }

  clearFormError();
  addQuote(text, author);
  form.reset();
  textInput.focus();
});

textInput.addEventListener("input", clearFormError);
authorInput.addEventListener("input", clearFormError);

renderSaved();
nextQuote();
