const phrases = [
  {
    id: "greeting",
    label: "안녕하세요",
    context: "첫 만남 혹은 회의 시작 인사",
    steps: [
      "두 손을 가슴 앞에 모으고 상대를 바라봅니다.",
      "오른손을 가볍게 위로 올리며 반원을 그립니다.",
      "밝은 표정으로 고개를 살짝 숙입니다.",
    ],
    mood: "bright",
  },
  {
    id: "coffee",
    label: "커피 마실래요?",
    context: "친구 혹은 동료에게 제안",
    steps: [
      "왼손으로 컵 모양을 만들고 가슴 높이에 둡니다.",
      "오른손 검지를 살짝 흔들며 질문을 강조합니다.",
      "눈썹을 올려 물음의 뉘앙스를 전달합니다.",
    ],
    mood: "focus",
  },
  {
    id: "thanks",
    label: "고마워요",
    context: "감사 표현",
    steps: [
      "오른손을 가슴에서 입 쪽으로 가져갑니다.",
      "부드럽게 앞으로 내밀며 미소 짓습니다.",
      "마지막에 고개를 살짝 끄덕입니다.",
    ],
    mood: "calm",
  },
  {
    id: "meeting",
    label: "회의 시작합시다",
    context: "팀 미팅 진행",
    steps: [
      "양손을 펴고 사람들을 모으듯 둥글게 그립니다.",
      "오른손을 시계 방향으로 돌리며 시작을 알립니다.",
      "시선을 모두에게 나누어주며 집중을 유도합니다.",
    ],
    mood: "focus",
  },
  {
    id: "later",
    label: "나중에 얘기해요",
    context: "잠시 뒤 대화 제안",
    steps: [
      "오른손을 귀 옆에서 앞으로 살짝 뻗습니다.",
      "시계를 가리키듯 손목을 가볍게 두드립니다.",
      "부드러운 미소로 기다림의 의사를 전합니다.",
    ],
    mood: "calm",
  },
  {
    id: "help",
    label: "도와드릴까요?",
    context: "서비스/케어 상황",
    steps: [
      "왼손을 받침처럼 펼치고 오른손을 위에 둡니다.",
      "오른손을 앞으로 밀며 도움 의사를 전달합니다.",
      "눈을 맞추고 고개를 약간 기울입니다.",
    ],
    mood: "bright",
  },
  {
    id: "ok",
    label: "괜찮아요",
    context: "상대 안심시키기",
    steps: [
      "오른손 엄지와 검지를 붙여 OK 제스처를 만듭니다.",
      "가슴 앞에서 부드럽게 두 번 돌립니다.",
      "밝게 미소 지으며 고개를 끄덕입니다.",
    ],
    mood: "bright",
  },
  {
    id: "wait",
    label: "잠깐만요",
    context: "대기 요청",
    steps: [
      "손바닥을 앞으로 향하게 펴고 상대를 향해 보입니다.",
      "손가락을 모아 살짝 아래로 내립니다.",
      "집중된 표정으로 기다림을 강조합니다.",
    ],
    mood: "focus",
  },
  {
    id: "nice",
    label: "반가워요",
    context: "친근한 인사",
    steps: [
      "양손을 가슴 앞에서 교차한 뒤 부드럽게 펼칩니다.",
      "미소를 지으며 시선을 맞춥니다.",
      "마지막에 오른손을 심장 쪽으로 가져옵니다.",
    ],
    mood: "calm",
  },
];

const selectEl = document.getElementById("phraseSelect");
const stepsEl = document.getElementById("phraseSteps");
const descriptionEl = document.getElementById("phraseDescription");
const cardsEl = document.getElementById("phraseCards");
const tempoEl = document.getElementById("tempoRange");
const stageStatus = document.getElementById("stageStatus");
const avatar = document.getElementById("signGemma");
const renderBtn = document.getElementById("renderBtn");
const guide = document.getElementById("quickGuide");
const openGuide = document.getElementById("openGuide");
const closeGuide = document.getElementById("closeGuide");
const startPractice = document.getElementById("startPractice");
const downloadKit = document.getElementById("downloadKit");

const chipButtons = Array.from(document.querySelectorAll(".chip"));
let selectedMood = "bright";

function populateSelect() {
  selectEl.innerHTML = phrases
    .map((phrase) => `<option value="${phrase.id}">${phrase.label}</option>`)
    .join("");
}

function renderCards() {
  cardsEl.innerHTML = phrases
    .map(
      (phrase) => `
      <article class="card" data-id="${phrase.id}">
        <h3>${phrase.label}</h3>
        <p>${phrase.context}</p>
      </article>
    `
    )
    .join("");
}

function updateScript(id) {
  const phrase = phrases.find((item) => item.id === id);
  if (!phrase) return;
  descriptionEl.textContent = phrase.context;
  stepsEl.innerHTML = phrase.steps.map((step) => `<li>${step}</li>`).join("");
  stageStatus.textContent = `${phrase.label} · ${tempoEl.value}x`;
  setMood(phrase.mood);
}

function setMood(mood) {
  selectedMood = mood;
  chipButtons.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.mood === mood);
  });
  avatar.classList.remove("emote-bright", "emote-calm", "emote-focus");
  avatar.classList.add(`emote-${mood}`);
}

function applyAvatarState() {
  const phraseId = selectEl.value;
  updateScript(phraseId);
  avatar.style.setProperty("--tempo", tempoEl.value);
  stageStatus.textContent = `${phrases.find((p) => p.id === phraseId)?.label ?? "기본"} · ${tempoEl.value}x · ${moodLabel(selectedMood)}`;
}

function moodLabel(mood) {
  switch (mood) {
    case "bright":
      return "밝은 표정";
    case "calm":
      return "차분";
    case "focus":
      return "집중";
    default:
      return "기본";
  }
}

function toggleGuide(forceOpen = false) {
  const isActive = guide.classList.contains("active");
  if (forceOpen || !isActive) {
    guide.classList.add("active");
    guide.setAttribute("aria-hidden", "false");
  } else {
    guide.classList.remove("active");
    guide.setAttribute("aria-hidden", "true");
  }
}

function exportScript() {
  const exportData = phrases
    .map((phrase) => `${phrase.label}: ${phrase.steps.join(" / ")}`)
    .join("\n");
  const blob = new Blob([exportData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sign-gemma-kit.txt";
  a.click();
  URL.revokeObjectURL(url);
}

populateSelect();
renderCards();
updateScript(phrases[0].id);

selectEl.addEventListener("change", (event) => updateScript(event.target.value));
renderBtn.addEventListener("click", applyAvatarState);
openGuide.addEventListener("click", () => toggleGuide(true));
closeGuide.addEventListener("click", () => toggleGuide(false));
guide.addEventListener("click", (event) => {
  if (event.target === guide) toggleGuide(false);
});
startPractice.addEventListener("click", () => {
  document.getElementById("practiceStage").scrollIntoView({ behavior: "smooth" });
});
downloadKit.addEventListener("click", exportScript);

tempoEl.addEventListener("input", () => {
  stageStatus.textContent = `${phrases.find((p) => p.id === selectEl.value)?.label ?? "기본"} · ${tempoEl.value}x`;
});

chipButtons.forEach((chip) =>
  chip.addEventListener("click", () => {
    setMood(chip.dataset.mood);
    applyAvatarState();
  })
);

cardsEl.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;
  selectEl.value = card.dataset.id;
  updateScript(card.dataset.id);
  applyAvatarState();
});
