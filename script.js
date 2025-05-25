const quizData = [
  {
    question: "Which tile is the red dragon?",
    image: "red-dragon.jpg",
    type: "multiple",
    options: ["Red Dragon", "White Dragon", "Green Dragon"],
    answer: "Red Dragon"
  },
  {
    question: "Match the tile to its type:",
    type: "matching",
    pairs: [
      { left: "Bamboo 1", right: "Bamboo" },
      { left: "Character 5", right: "Character" },
      { left: "Dot 9", right: "Dot" }
    ]
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

function updateScore(isCorrect) {
  if (isCorrect) score++;
  scoreDisplay.textContent = `Score: ${score}`;
}

function loadQuestion() {
  quizContainer.innerHTML = "";
  const q = quizData[currentQuestion];

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
    const optionsList = document.createElement("ul");
    optionsList.className = "quiz-options";
    q.options.forEach(option => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => {
        updateScore(option === q.answer);
        nextBtn.disabled = false;
      };
      li.appendChild(btn);
      optionsList.appendChild(li);
    });
    quizContainer.appendChild(optionsList);
    nextBtn.disabled = true;
  } else if (q.type === "matching") {
    const matchContainer = document.createElement("div");
    matchContainer.style.display = "flex";
    matchContainer.style.justifyContent = "space-around";

    const leftList = document.createElement("ul");
    const rightList = document.createElement("ul");
    leftList.className = "quiz-options";
    rightList.className = "quiz-options";

    q.pairs.forEach(pair => {
      const leftItem = document.createElement("li");
      leftItem.textContent = pair.left;
      leftItem.className = "draggable";
      leftItem.draggable = true;
      leftItem.id = pair.left;

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
        if (data.includes(rightItem.textContent)) {
          updateScore(true);
          rightItem.textContent = `${rightItem.textContent} ✓`;
        } else {
          updateScore(false);
        }
      };

      leftList.appendChild(leftItem);
      rightList.appendChild(rightItem);
    });

    matchContainer.appendChild(leftList);
    matchContainer.appendChild(rightList);
    quizContainer.appendChild(matchContainer);
    nextBtn.disabled = false;
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion = (currentQuestion + 1) % quizData.length;
  loadQuestion();
});

loadQuestion();
