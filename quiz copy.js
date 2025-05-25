const quizData = [
  {
    type: "explanation",
    content: "Welcome to the Mahjong Quiz! Click next to begin."
  },
  {
    question: "Which tile is the red dragon?",
    image: "red-dragon.jpg",
    type: "multiple",
    options: ["Red Dragon", "White Dragon", "Green Dragon"],
    answer: "Red Dragon"
  },
  {
    type: "explanation",
    content: "Now let's try a matching question. Drag the items to the correct categories."
  },
  {
    question: "Match the tile to its type:",
    type: "matching",
    pairs: [
      { left: { type: "image", src: "images/penchan.png", id: "penchan" }, right: "Penchan" },
      { left: { type: "image", src: "images/kanchan.png", id: "kanchan" }, right: "Kanchan" },
      { left: { type: "image", src: "images/ryanmen.png", id: "ryanmen" }, right: "Ryanmen" }
    ]
  }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let matchAnswers = {};

const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
scoreDisplay.style.display = "none";

function loadQuestion() {
  quizContainer.innerHTML = "";
  const q = quizData[currentQuestion];
  nextBtn.disabled = false;

  if (q.type === "explanation") {
    const exp = document.createElement("div");
    exp.className = "quiz-question";
    exp.textContent = q.content;
    quizContainer.appendChild(exp);
    return;
  }

  const questionEl = document.createElement("div");
  questionEl.className = "quiz-question";
  questionEl.textContent = q.question;
  quizContainer.appendChild(questionEl);

  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    img.alt = "Question image";
    img.style.maxWidth = "100%";
    quizContainer.appendChild(img);
  }

  if (q.type === "multiple") {
    selectedAnswer = null;
    const optionsList = document.createElement("ul");
    optionsList.className = "quiz-options";
    q.options.forEach(option => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => {
        selectedAnswer = option;
        nextBtn.disabled = false;
      };
      li.appendChild(btn);
      optionsList.appendChild(li);
    });
    quizContainer.appendChild(optionsList);
    nextBtn.disabled = true;
  } else if (q.type === "matching") {
    matchAnswers = {};
    const matchContainer = document.createElement("div");
    matchContainer.style.display = "flex";
    matchContainer.style.justifyContent = "space-around";

    const leftList = document.createElement("ul");
    const rightList = document.createElement("ul");
    leftList.className = "quiz-options";
    rightList.className = "quiz-options";

    q.pairs.forEach(pair => {
      const leftItem = document.createElement("li");
      leftItem.className = "draggable";
      leftItem.draggable = true;
      leftItem.id = pair.left.id;

      if (pair.left.type === "image") {
        const img = document.createElement("img");
        img.src = pair.left.src;
        img.alt = pair.left.id;
        img.style.maxWidth = "100px";
        leftItem.appendChild(img);
      } else {
        leftItem.textContent = pair.left;
      }

      leftItem.ondragstart = e => {
        e.dataTransfer.setData("text/plain", e.target.id);
      };

      const rightItem = document.createElement("li");
      rightItem.textContent = pair.right;
      rightItem.className = "droppable";
      rightItem.ondragover = e => e.preventDefault();
      rightItem.ondrop = e => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        matchAnswers[data] = rightItem.textContent;
        rightItem.textContent = `${rightItem.textContent} ← ${data}`;
      };

      leftList.appendChild(leftItem);
      rightList.appendChild(rightItem);
    });

    matchContainer.appendChild(leftList);
    matchContainer.appendChild(rightList);
    quizContainer.appendChild(matchContainer);
  }
}

nextBtn.addEventListener("click", () => {
  const q = quizData[currentQuestion];

  if (q.type === "multiple") {
    if (selectedAnswer === q.answer) score++;
  } else if (q.type === "matching") {
    const correct = q.pairs.every(pair => matchAnswers[pair.left.id] === pair.right);
    if (correct) score++;
  }

  currentQuestion++;
  if (currentQuestion >= quizData.length) {
    quizContainer.innerHTML = `<h2>Quiz complete!</h2><p>Your score: ${score} / ${quizData.filter(q => q.type !== 'explanation').length}</p>`;
    nextBtn.style.display = "none";
    scoreDisplay.style.display = "block";
    scoreDisplay.textContent = `Final Score: ${score}`;
  } else {
    loadQuestion();
  }
});

loadQuestion();
