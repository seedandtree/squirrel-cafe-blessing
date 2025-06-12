
const quizData = [
    {step: "감정 상태", question: "오늘 당신의 기분은 어떤가요?", options: [
        "조용히 위로받고 싶어요", "행복을 나누고 싶어요", "살짝 마음이 울적해요", "새로운 상상을 펼치고 싶어요", "고민이 많아요"
    ]},
    {step: "음료 선택", question: "오늘 마시고 싶은 음료는 무엇인가요?", options: [
        "도토리 라떼", "허브 블렌드티", "블루베리 무드티", "라벤더 드림밀크"
    ]},
    {step: "디저트 선택", question: "어떤 디저트를 함께 드시겠어요?", options: [
        "당근 케이크", "마카롱 타워", "초코 브라우니", "블루베리 치즈케이크"
    ]},
    {step: "토핑 선택", question: "디저트에 어떤 토핑을 얹을까요?", options: [
        "꿀 시럽", "피스타치오 크런치", "딸기 슬라이스", "초코칩"
    ]},
    {step: "함께할 사람", question: "오늘 이 시간을 누구와 함께하고 싶으신가요?", options: [
        "혼자 조용히", "친구와 수다", "가족과 함께", "선생님"
    ]},
    {step: "자리 선택", question: "어디 자리에서 먹고 싶은가요?", options: [
        "시원한 테라스", "숲속 정원", "호수가 보이는 자리", "다락방 소파 자리"
    ]},
    {step: "음악 선택", question: "어떤 음악이 어울릴까요?", options: [
        "숲속 바람소리와 피아노", "햇살 가득한 보사노바", "비 오는 날의 재즈", "몽환적인 로파이", "잔잔한 클래식 기타"
    ]},
    {step: "내가 만든 책", question: "오늘 추천하고 싶은 책 제목은?", options: [
        "별똥별을 담은 찻잔", "다람쥐 마루의 비밀 레시피", "달빛 아래에서 만난 고슴도치", "호숫가 작은 우체국", "바람이 건네준 편지 한 장"
    ]}
];

let current = 0;
let answers = [];

const quizDiv = document.getElementById("quiz");
const nextBtn = document.getElementById("next");
const resultDiv = document.getElementById("result");

nextBtn.addEventListener("click", () => {
    const checked = document.querySelector("input[name='option']:checked");
    if (!checked) {
        alert("하나를 선택해 주세요.");
        return;
    }
    answers.push(checked.value);
    current++;
    if (current < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showQuestion() {
    const q = quizData[current];
    quizDiv.innerHTML = `
        <h2>${q.step}</h2>
        <p>${q.question}</p>
        ${q.options.map(opt => `
            <label><input type="radio" name="option" value="${opt}"> ${opt}</label>
        `).join("")}
    `;
}

function analyzePersonality() {
    const emotion = answers[0];
    if (emotion === "조용히 위로받고 싶어요") {
        return { type: "섬세한 위로자", message: "당신은 조용히 주변을 살피고 배려하는 따뜻한 사람이군요. 당신의 작은 마음 씀이 누군가에겐 큰 위로가 됩니다." };
    } else if (emotion === "행복을 나누고 싶어요") {
        return { type: "햇살 같은 긍정가", message: "당신은 주변에 웃음과 따뜻함을 전하는 사람입니다. 오늘도 당신의 긍정이 주변을 밝게 비춥니다." };
    } else if (emotion === "살짝 마음이 울적해요") {
        return { type: "조용한 치유자", message: "당신은 조용히 자신을 돌아보고, 내면을 성장시키는 힘을 가진 사람입니다. 천천히 피어나는 당신을 응원합니다." };
    } else if (emotion === "새로운 상상을 펼치고 싶어요") {
        return { type: "따뜻한 상상가", message: "당신은 상상의 날개를 펼치며 세상을 바라보는 사람입니다. 당신의 상상은 누군가의 꿈이 됩니다." };
    } else {
        return { type: "깊은 탐색가", message: "당신은 고민을 두려워하지 않고 삶을 탐색하는 용기를 가진 사람입니다. 질문하는 힘이 당신을 성장시킵니다." };
    }
}

function showResult() {
    quizDiv.style.display = "none";
    nextBtn.style.display = "none";
    resultDiv.classList.remove("hidden");

    const profile = analyzePersonality();

    resultDiv.innerHTML = `
        <h2>🍵 당신의 숲속 다람쥐 카페 세트가 완성되었습니다!</h2>
        <p>${answers.join(" ➔ ")}</p>
        <h3>💌 당신에게 마음을 선물합니다 💌</h3>
        <p><strong>당신은 ${profile.type}군요.</strong></p>
        <p>${profile.message}</p>
    `;
}

showQuestion();
