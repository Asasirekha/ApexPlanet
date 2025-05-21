const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "C", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Desktop Oriented Mode"],
    answer: "Document Object Model"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Sun Microsystems", "Netscape"],
    answer: "Netscape"
  }
];

let currentQ = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  clearOptions();
  const q = quizData[currentQ];
  questionEl.textContent = q.question;

  q.options.forEach(option => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = option;
    btn.addEventListener("click", () => selectOption(btn, q.answer));
    optionsEl.appendChild(btn);
  });
}

function clearOptions() {
  optionsEl.innerHTML = "";
}

function selectOption(selectedBtn, correctAnswer) {
  const options = document.querySelectorAll(".option");
  options.forEach(btn => btn.classList.remove("selected"));
  selectedBtn.classList.add("selected");
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector(".option.selected");
  if (!selected) return;

  const userAnswer = selected.textContent;
  if (userAnswer === quizData[currentQ].answer) {
    score++;
  }

  currentQ++;
  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  scoreEl.classList.remove("hide");
  scoreEl.innerHTML = `🎉 Your Score: <span>${score}</span> / ${quizData.length}`;
}

// Initial load
loadQuestion();
