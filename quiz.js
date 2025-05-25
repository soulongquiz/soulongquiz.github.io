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
      { left: { type: "image", src: "images/ryanmen.png", id: "Ryanmen" }, right: "Two-Sided Wait" },
      { left: { type: "image", src: "images/penchan.png", id: "Penchan" }, right: "Edge Wait" },
      { left: { type: "image", src: "images/kanchan.png", id: "Kanchan" }, right: "Closed Wait" }
    ]
  }
];

let currentQuestion = 0;
let score = 0;

// Stores the selected answers per question index
const selectedAnswers = new Array(quizData.length).fill(null);
// Stores match answers per question index (object mapping left id to right string)
const matchAnswers = new Array(quizData.length).fill(null);

// Tracks which questions have been checked (locked)
const checkedQuestions = new Set();

// Store feedback DOM elements per question for persistent display
const feedbackElements = new Array(quizData.length).fill(null);

const quizContainer = document.getElementById("quiz-container");
const scoreDisplay = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const checkBtn = document.getElementById("check-btn");
const questionNav = document.getElementById("question-nav");

scoreDisplay.style.display = "none";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Render question nav buttons, coloring them after test finished
function renderQuestionNav(finished = false) {
  if (!questionNav) return;
  questionNav.innerHTML = "";
  quizData.forEach((q, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.disabled = finished ? false : false;

    // After test finished, color buttons green/red for correctness
    if (finished) {
      const isCorrect = isAnswerCorrect(i);
      btn.style.backgroundColor = isCorrect ? "#4caf50" : "#f44336";
      btn.style.color = "white";
      btn.style.fontWeight = "bold";
    } else {
      if (i === currentQuestion) btn.classList.add("current-question");
    }

    btn.onclick = () => {
      currentQuestion = i;
      loadQuestion();
    };
    questionNav.appendChild(btn);
  });
}

function isAnswerCorrect(qIndex) {
  const q = quizData[qIndex];
  if (q.type === "multiple") {
    return selectedAnswers[qIndex] === q.answer;
  } else if (q.type === "matching") {
    const ans = matchAnswers[qIndex] || {};
    return q.pairs.every(pair => ans[pair.left.id] === pair.right);
  }
  return false;
}

function disableInputs(disabled) {
  // Disable all buttons or inputs inside quizContainer accordingly
  const buttons = quizContainer.querySelectorAll("button");
  buttons.forEach(b => {
    // Never disable navigation buttons here
    if (b.id !== "next-btn" && b.id !== "back-btn" && b.id !== "check-btn") {
      b.disabled = disabled;
    }
  });

  const draggables = quizContainer.querySelectorAll(".draggable");
  draggables.forEach(el => el.draggable = !disabled);
}

// Load a question and restore saved answers
function loadQuestion() {
  quizContainer.innerHTML = "";
  const q = quizData[currentQuestion];

  renderNavigationButtons();
  renderQuestionNav(scoreDisplay.style.display === "block"); // color nav after finish

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
      btn.type = "button";

      // Restore selected answer
      if (selectedAnswers[currentQuestion] === option) {
        btn.classList.add("selected");
      }

      btn.onclick = () => {
        // If locked by checkBtn, ignore clicks
        if (checkedQuestions.has(currentQuestion)) return;

        selectedAnswers[currentQuestion] = option;

        // Visual feedback: only one selected
        optionsList.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
      };
      li.appendChild(btn);
      optionsList.appendChild(li);
    });
    quizContainer.appendChild(optionsList);

  } else if (q.type === "matching") {
    // Matching question: show draggable left, droppable right
    // Restore matches from saved state or empty object
    matchAnswers[currentQuestion] = matchAnswers[currentQuestion] || {};
    const currentMatchAnswers = matchAnswers[currentQuestion];

    const matchContainer = document.createElement("div");
    matchContainer.style.display = "flex";
    matchContainer.style.justifyContent = "space-around";
    matchContainer.style.gap = "40px";

    const leftList = document.createElement("ul");
    const rightList = document.createElement("ul");
    leftList.className = "quiz-options";
    rightList.className = "quiz-options";

    const correctPairs = q.pairs;
    const shuffledLeft = shuffleArray([...correctPairs]);
    const shuffledRight = shuffleArray([...correctPairs.map(pair => pair.right)]);

    // Left draggable items
    shuffledLeft.forEach(pair => {
      const leftItem = document.createElement("li");
      leftItem.className = "draggable";
      leftItem.draggable = !checkedQuestions.has(currentQuestion);
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
        if (checkedQuestions.has(currentQuestion)) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData("text/plain", pair.left.id);
      };

      leftList.appendChild(leftItem);
    });

    // Right droppable targets
    shuffledRight.forEach(right => {
      const rightItem = document.createElement("li");
      rightItem.className = "droppable";
      rightItem.setAttribute("data-right", right);
      rightItem.ondragover = e => e.preventDefault();

      rightItem.ondrop = e => {
        e.preventDefault();
        if (checkedQuestions.has(currentQuestion)) return;

        const data = e.dataTransfer.getData("text/plain");
        const draggedEl = document.getElementById(data);

        // Save match answer
        currentMatchAnswers[data] = right;

        // Remove previous dropped elements with same id from other drop spots
        document.querySelectorAll(".droppable").forEach(el => {
          if (el !== rightItem && el.querySelector(`#${data}`)) {
            el.innerHTML = `<div>${el.getAttribute("data-right")}</div>`;
          }
        });

        // Clone dragged element to append here
        const clone = draggedEl.cloneNode(true);
        clone.draggable = true;
        clone.id = data;
        clone.ondragstart = e => {
          if (checkedQuestions.has(currentQuestion)) e.preventDefault();
          else e.dataTransfer.setData("text/plain", data);
        };

        rightItem.innerHTML = `<div>${right}</div>`;
        rightItem.appendChild(clone);
      };

      // Restore dropped item if saved
      // Find which left id matched this right string
      let matchedLeftId = null;
      for (const [leftId, rightStr] of Object.entries(currentMatchAnswers)) {
        if (rightStr === right) {
          matchedLeftId = leftId;
          break;
        }
      }

      if (matchedLeftId) {
        rightItem.innerHTML = `<div>${right}</div>`;
        const leftPair = q.pairs.find(p => p.left.id === matchedLeftId);
        if (leftPair) {
          const clone = document.createElement("li");
          clone.className = "draggable";
          clone.draggable = !checkedQuestions.has(currentQuestion);
          clone.id = matchedLeftId;

          if (leftPair.left.type === "image") {
            const img = document.createElement("img");
            img.src = leftPair.left.src;
            img.alt = matchedLeftId;
            img.style.maxWidth = "100px";
            clone.appendChild(img);
          } else {
            clone.textContent = leftPair.left;
          }

          rightItem.appendChild(clone);
        }
      } else {
        rightItem.innerHTML = `<div>${right}</div>`;
      }

      rightList.appendChild(rightItem);
    });

    matchContainer.appendChild(leftList);
    matchContainer.appendChild(rightList);
    quizContainer.appendChild(matchContainer);
  }

  // Show saved feedback if test finished or question was checked
  if (scoreDisplay.style.display === "block" || checkedQuestions.has(currentQuestion)) {
    if (feedbackElements[currentQuestion]) {
      quizContainer.appendChild(feedbackElements[currentQuestion]);
    } else {
      // If feedback missing but checked, create it
      const fb = createFeedback(currentQuestion);
      feedbackElements[currentQuestion] = fb;
      quizContainer.appendChild(fb);
    }
  }

  // Disable inputs if checked for this question (lock answers)
  disableInputs(checkedQuestions.has(currentQuestion));
}

// Create and return a feedback element for a question
function createFeedback(qIndex) {
  const q = quizData[qIndex];
  const fb = document.createElement("div");
  fb.className = "feedback";

  let correct = false;
  if (q.type === "multiple") {
    correct = selectedAnswers[qIndex] === q.answer;
  } else if (q.type === "matching") {
    const ans = matchAnswers[qIndex] || {};
    correct = q.pairs.every(pair => ans[pair.left.id] === pair.right);
  }

  if (correct) {
    fb.textContent = "Correct!";
    fb.style.color = "green";
  } else {
    fb.textContent = "Incorrect. Try again or review your answers.";
    fb.style.color = "red";
  }
  return fb;
}

// Render next/back/finish buttons state
function renderNavigationButtons() {
  backBtn.disabled = currentQuestion === 0;

  if (currentQuestion === quizData.length - 1) {
    nextBtn.textContent = "Finish test";
  } else {
    nextBtn.textContent = "Next";
  }
}

// Handle Check button click
checkBtn.onclick = () => {
  if (checkedQuestions.has(currentQuestion)) return; // Already checked

  // Only allow check if answer selected
  let canCheck = false;
  const q = quizData[currentQuestion];
  if (q.type === "multiple") {
    canCheck = selectedAnswers[currentQuestion] !== null;
  } else if (q.type === "matching") {
    canCheck = !!matchAnswers[currentQuestion] && Object.keys(matchAnswers[currentQuestion]).length === q.pairs.length;
  }

  if (!canCheck) {
    alert("Please select an answer before checking.");
    return;
  }

  // Mark this question checked (lock answers)
  checkedQuestions.add(currentQuestion);

  // Show feedback
  const fb = createFeedback(currentQuestion);
  feedbackElements[currentQuestion] = fb;
  quizContainer.appendChild(fb);

  // Disable inputs for this question
  disableInputs(true);
};

// Next button click (or Finish test)
nextBtn.onclick = () => {
  if (currentQuestion === quizData.length - 1) {
    finishTest();
  } else {
    currentQuestion++;
    // If not checked, clear lock so can change answer on revisit
    if (!checkedQuestions.has(currentQuestion)) {
      checkedQuestions.delete(currentQuestion);
    }
    loadQuestion();
  }
};

// Back button click
backBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    // If not checked, clear lock so can change answer on revisit
    if (!checkedQuestions.has(currentQuestion)) {
      checkedQuestions.delete(currentQuestion);
    }
    loadQuestion();
  }
};

// Finish test function
function finishTest() {
  // Calculate final score
  score = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (isAnswerCorrect(i)) score++;
  }

  scoreDisplay.style.display = "block";
  scoreDisplay.textContent = `Your score: ${score} / ${quizData.length}`;

  // Color question buttons accordingly
  renderQuestionNav(true);

  // Reveal feedback on all questions after finish
  checkedQuestions.clear();
  for (let i = 0; i < quizData.length; i++) {
    checkedQuestions.add(i);
  }

  // Reload current question to show feedback locked
  loadQuestion();

  // Disable check button and next/back after finish to avoid confusion
  checkBtn.disabled = true;
  nextBtn.disabled = true;
  backBtn.disabled = false; // Allow review with back button

  // Disable all inputs after finish
  disableInputs(true);
}

// Initial render
renderQuestionNav();
loadQuestion();
