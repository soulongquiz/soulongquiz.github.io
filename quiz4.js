// Quiz data with examples
const quizData = [
  {
    question: "Which tile is the red dragon?",
    image: "red-dragon.jpg",
    type: "multiple",
    options: ["Red Dragon", "White Dragon", "Green Dragon"],
    answer: "Red Dragon",
    feedbackCorrect: "Yes! The red dragon is the correct choice.",
    feedbackIncorrect: "No, that's not the red dragon."
  },
  {
    question: "Match the tile to its type:",
    type: "matching",
    pairs: [
      { left: { type: "image", src: "images/ryanmen.png", id: "Ryanmen" }, right: "Two-Sided Wait" },
      { left: { type: "image", src: "images/penchan.png", id: "Penchan" }, right: "Edge Wait" },
      { left: { type: "image", src: "images/kanchan.png", id: "Kanchan" }, right: "Closed Wait" }
    ],
    feedbackCorrect: "Excellent! All pairs are correct.",
    feedbackIncorrect: "Some matches are off. Try reviewing the types."
  }
];

let currentQuestion = 0;
let selectedAnswers = {}; // store multiple-choice selections
let matchAnswersPerQuestion = {}; // matching answers storage
let checkedQuestions = new Set();
let answersCorrectness = {};
let quizFinished = false;

const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const checkBtn = document.getElementById("check-btn");
const finishBtn = document.getElementById("finish-btn");
const questionNav = document.getElementById("question-nav");

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderQuestionNav() {
  questionNav.innerHTML = "";
  quizData.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.onclick = () => {
      currentQuestion = i;
      loadQuestion();
    };
    btn.classList.remove("correct", "incorrect", "current-question");

    if (answersCorrectness[i] === true) btn.classList.add("correct");
    else if (answersCorrectness[i] === false) btn.classList.add("incorrect");
    if (i === currentQuestion) btn.classList.add("current-question");

    questionNav.appendChild(btn);
  });
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = "";

  // Question text
  const questionEl = document.createElement("div");
  questionEl.className = "quiz-question";
  questionEl.textContent = q.question;
  quizContainer.appendChild(questionEl);

  // Show image if exists
  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    img.alt = "Question image";
    img.style.maxWidth = "100%";
    img.style.marginBottom = "1em";
    quizContainer.appendChild(img);
  }

  // Render question by type using dedicated functions
  if (q.type === "multiple") {
    renderMultipleChoice(q);
  } else if (q.type === "matching") {
    renderMatching(q);
  }

  backBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion === quizData.length - 1;

  // Next button text changes to "Finish" on last question
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finish" : "Next";

  // Hide check button if quiz finished
  checkBtn.style.display = quizFinished ? "none" : "inline-block";

  // Show feedback if quiz finished or question checked
  const showFb = quizFinished || checkedQuestions.has(currentQuestion);
  if (showFb) {
    clearFeedback();
    const fb = createFeedback(currentQuestion);
    quizContainer.appendChild(fb);
  }

  renderQuestionNav();

  scoreDisplay.style.display = quizFinished ? "block" : "none";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else if (!quizFinished) {
    // On Finish click - auto check all
    autoCheckAllQuestions();
    quizFinished = true;
    loadQuestion();
    showFinalScore();
    renderQuestionNav();
  }
});

function autoCheckAllQuestions() {
  for (let i = 0; i < quizData.length; i++) {
    checkedQuestions.add(i);

    // For matching questions, if any answers missing, just leave empty (incorrect)
    // For multiple choice, if no answer selected, leave as undefined (incorrect)
    if (quizData[i].type === "matching") {
      if (!matchAnswersPerQuestion[i]) {
        matchAnswersPerQuestion[i] = {};
      }
    }
  }
}

// Disable Check button event since now checking is automatic
checkBtn.style.display = "none";

function renderMultipleChoice(question) {
  if (question.image) {
    const img = document.createElement("img");
    img.src = question.image;
    img.alt = question.question;
    img.style.maxWidth = "180px";
    img.style.display = "block";
    img.style.margin = "0 auto 1em";
    quizContainer.appendChild(img);
  }

  const ul = document.createElement("ul");
  ul.classList.add("quiz-options");

  const options = shuffleArray(question.options);

  options.forEach(option => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = option;

    // Pre-select if answer stored
    if (selectedAnswers[currentQuestion] === option) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      // Clear all others
      const siblings = ul.querySelectorAll("button.option-btn");
      siblings.forEach(sib => sib.classList.remove("selected"));
      btn.classList.add("selected");
      selectedAnswers[currentQuestion] = option;
      clearFeedback();
    };
    li.appendChild(btn);
    ul.appendChild(li);
  });
  quizContainer.appendChild(ul);
}

function renderMatching(question) {
  // Create left and right columns
  const container = document.createElement("div");
  container.classList.add("match-container");

  // Left list with draggable items
  const leftList = document.createElement("ul");
  leftList.id = "left-list";

  question.pairs.forEach(pair => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("draggable");
    div.draggable = true;
    div.id = pair.left.id;
    if (pair.left.type === "image") {
      const img = document.createElement("img");
      img.src = pair.left.src;
      img.alt = pair.left.id;
      div.appendChild(img);
      div.appendChild(document.createTextNode(pair.left.id));
    } else {
      div.textContent = pair.left.id;
    }
    li.appendChild(div);
    leftList.appendChild(li);
  });

  container.appendChild(leftList);

  // Right list with droppable slots
  const rightList = document.createElement("ul");
  rightList.id = "right-list";

  question.pairs.forEach(pair => {
    const li = document.createElement("li");
    li.classList.add("droppable");
    li.dataset.matchId = pair.right;
    li.textContent = pair.right;

    // If answer exists, show dropped draggable
    const existing = matchAnswersPerQuestion[currentQuestion]?.[pair.right];
    if (existing) {
      const droppedDiv = document.createElement("div");
      droppedDiv.classList.add("draggable");
      droppedDiv.id = existing.id;
      droppedDiv.draggable = true;
      if (existing.src) {
        const img = document.createElement("img");
        img.src = existing.src;
        img.alt = existing.id;
        droppedDiv.appendChild(img);
        droppedDiv.appendChild(document.createTextNode(existing.id));
      } else {
        droppedDiv.textContent = existing.id;
      }
      li.textContent = pair.right;
      li.appendChild(droppedDiv);
    }

    rightList.appendChild(li);
  });

  container.appendChild(rightList);
  quizContainer.appendChild(container);

  // Setup drag and drop events
  setupDragAndDrop();
}

function setupDragAndDrop() {
  const draggables = document.querySelectorAll(".draggable");
  const droppables = document.querySelectorAll(".droppable");

  draggables.forEach(drag => {
    drag.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", drag.id);
      setTimeout(() => {
        drag.style.display = "none";
      }, 0);
    });
    drag.addEventListener("dragend", e => {
      e.target.style.display = "flex";
    });
  });

  droppables.forEach(drop => {
    drop.addEventListener("dragover", e => {
      e.preventDefault();
      drop.style.backgroundColor = "#d4edda";
    });
    drop.addEventListener("dragleave", e => {
      drop.style.backgroundColor = "#f9f9f9";
    });
    drop.addEventListener("drop", e => {
      e.preventDefault();
      drop.style.backgroundColor = "#f9f9f9";

      const dragId = e.dataTransfer.getData("text/plain");
      const dragEl = document.getElementById(dragId);

      // Prevent duplicate drops on same droppable
      if (!dragEl) return;

      // Remove dragEl from old parent if any
      if (dragEl.parentNode && dragEl.parentNode.classList.contains("droppable")) {
        dragEl.parentNode.removeChild(dragEl);
      }

      // Remove existing draggable from drop (if any)
      const existing = drop.querySelector(".draggable");
      if (existing) {
        existing.parentNode.removeChild(existing);
      }

      // Append dragEl to drop
      drop.appendChild(dragEl);

      // Store answer
      if (!matchAnswersPerQuestion[currentQuestion]) {
        matchAnswersPerQuestion[currentQuestion] = {};
      }
      matchAnswersPerQuestion[currentQuestion][drop.dataset.matchId] = {
        id: dragEl.id,
        src: dragEl.querySelector("img")?.src || null
      };

      clearFeedback();
    });
  });
}

function clearFeedback() {
  const fb = document.querySelector(".feedback");
  if (fb) fb.remove();
}

function createFeedback(questionIndex) {
  const q = quizData[questionIndex];
  const fb = document.createElement("div");
  fb.classList.add("feedback");

  const correct = answersCorrectness[questionIndex];
  if (correct === true) {
    fb.classList.add("correct");
    fb.textContent = q.feedbackCorrect || "Correct!";
  } else if (correct === false) {
    fb.classList.add("incorrect");
    fb.textContent = q.feedbackIncorrect || "Incorrect.";
  } else {
    fb.textContent = "";
  }

  return fb;
}

function checkAnswer() {
  const q = quizData[currentQuestion];
  checkedQuestions.add(currentQuestion);

  if (q.type === "multiple") {
    const answer = selectedAnswers[currentQuestion];
    if (!answer) {
      alert("Please select an answer before checking.");
      return;
    }
    answersCorrectness[currentQuestion] = (answer === q.answer);
  } else if (q.type === "matching") {
    const answers = matchAnswersPerQuestion[currentQuestion];
    if (!answers) {
      alert("Please complete the matching before checking.");
      return;
    }
    let allCorrect = true;
    for (const pair of q.pairs) {
      const correctId = pair.left.id;
      const selected = answers[pair.right];
      if (!selected || selected.id !== correctId) {
        allCorrect = false;
        break;
      }
    }
    answersCorrectness[currentQuestion] = allCorrect;
  }
  loadQuestion();
  if (quizFinished) showFinalScore();
}

function showFinalScore() {
  let correctCount = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (answersCorrectness[i] === true) correctCount++;
  }
  scoreDisplay.textContent = `Your score: ${correctCount} out of ${quizData.length}`;
  scoreDisplay.style.display = "block";
}

checkBtn.addEventListener("click", checkAnswer);

backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
});

// Initial load
loadQuestion();
