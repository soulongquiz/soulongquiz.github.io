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

  const questionEl = document.createElement("div");
  questionEl.className = "quiz-question";
  questionEl.textContent = q.question;
  quizContainer.appendChild(questionEl);

  if (q.image) {
    const img = document.createElement("img");
    img.src = q.image;
    img.alt = "Question image";
    img.style.maxWidth = "100%";
    img.style.marginBottom = "1em";
    quizContainer.appendChild(img);
  }

  if (q.type === "multiple") {
    const optionsList = document.createElement("ul");
    optionsList.className = "quiz-options";
    q.options.forEach(option => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.className = "option-btn";
      if (selectedAnswers[currentQuestion] === option) btn.classList.add("selected");
      btn.onclick = () => {
        if (!quizFinished) {  // allow change only if quiz not finished
          selectedAnswers[currentQuestion] = option;
          document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
        }
      };
      li.appendChild(btn);
      optionsList.appendChild(li);
    });
    quizContainer.appendChild(optionsList);
  } else if (q.type === "matching") {
      renderMatching(q);
  } 

  backBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion === quizData.length - 1;

  // Change Next button text to "Finish" on last question
  nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finish" : "Next";

  // Disable check button after finish (or hide)
  checkBtn.style.display = quizFinished ? "none" : "inline-block";

  // Show feedback automatically if finished or question is checked
  const showFb = quizFinished || checkedQuestions.has(currentQuestion);
  if (showFb) {
    // Remove any existing feedback first
    const existingFb = quizContainer.querySelector(".feedback");
    if (existingFb) existingFb.remove();

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
      const id = e.dataTransfer.getData("text/plain");
      const dragElem = document.getElementById(id);

      // Only accept one draggable at a time
      // Remove previous if any
      const existingDrag = drop.querySelector(".draggable");
      if (existingDrag) {
        existingDrag.remove();
      }

      // Append dragged element clone to drop
      const clone = dragElem.cloneNode(true);
      clone.style.display = "flex";
      clone.draggable = true;
      clone.id = dragElem.id;
      drop.appendChild(clone);

      // Store answer in memory
      if (!matchAnswersPerQuestion[currentQuestion]) {
        matchAnswersPerQuestion[currentQuestion] = {};
      }
      matchAnswersPerQuestion[currentQuestion][drop.dataset.matchId] = {
        id: clone.id,
        src: clone.querySelector("img")?.src || null
      };

      // Remove draggable from left if matched
      dragElem.style.visibility = "hidden";

      // Allow dragging of clone inside droppable for rearranging or removing
      clone.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", clone.id);
        setTimeout(() => {
          clone.style.display = "none";
        }, 0);
      });
      clone.addEventListener("dragend", e => {
        e.target.style.display = "flex";
      });

      clearFeedback();
    });
  });

  // Allow removing draggable by dragging it back to left list
  const leftList = document.getElementById("left-list");
  leftList.addEventListener("dragover", e => {
    e.preventDefault();
  });
  leftList.addEventListener("drop", e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    // Find all droppables with this draggable and remove it
    document.querySelectorAll(".droppable").forEach(d => {
      const drag = d.querySelector(`.draggable#${id}`);
      if (drag) {
        drag.remove();
        d.style.backgroundColor = "#f9f9f9";
        // Remove from answers memory
        if (matchAnswersPerQuestion[currentQuestion]) {
          for (const key in matchAnswersPerQuestion[currentQuestion]) {
            if (matchAnswersPerQuestion[currentQuestion][key].id === id) {
              delete matchAnswersPerQuestion[currentQuestion][key];
            }
          }
        }
      }
    });
    // Make draggable visible again
    const dragElem = document.getElementById(id);
    if (dragElem) {
      dragElem.style.visibility = "visible";
    }
    clearFeedback();
  });
}

function clearFeedback() {
  const fb = quizContainer.querySelector(".feedback");
  if (fb) fb.remove();
}

function showFeedback(isCorrect, message) {
  clearFeedback();
  const fb = document.createElement("div");
  fb.classList.add("feedback");
  fb.textContent = message;
  fb.style.color = isCorrect ? "#2c6a4f" : "#b33a3a";
  quizContainer.appendChild(fb);
}

checkBtn.onclick = () => {
  const q = quizData[currentQuestion];
  if (q.type === "multiple") {
    if (!selectedAnswers[currentQuestion]) {
      alert("Please select an answer before checking.");
      return;
    }
    const isCorrect = selectedAnswers[currentQuestion] === q.answer;
    answersCorrectness[currentQuestion] = isCorrect;
    checkedQuestions.add(currentQuestion);

    showFeedback(isCorrect, isCorrect ? q.feedbackCorrect : q.feedbackIncorrect);
  } else if (q.type === "matching") {
    const userPairs = matchAnswersPerQuestion[currentQuestion];
    if (!userPairs || Object.keys(userPairs).length < q.pairs.length) {
      alert("Please match all pairs before checking.");
      return;
    }
    let isCorrect = true;
    for (const pair of q.pairs) {
      const matched = userPairs[pair.right];
      if (!matched || matched.id !== pair.left.id) {
        isCorrect = false;
        break;
      }
    }
    answersCorrectness[currentQuestion] = isCorrect;
    checkedQuestions.add(currentQuestion);

    showFeedback(isCorrect, isCorrect ? q.feedbackCorrect : q.feedbackIncorrect);
  }
};

backBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

finishBtn.onclick = () => {
  if (!quizFinished) {
    autoCheckAllQuestions();
    quizFinished = true;
    loadQuestion();
    showScore();
  }
};

function showScore() {
  let correctCount = 0;
  for (let i = 0; i < quizData.length; i++) {
    if (answersCorrectness[i]) correctCount++;
  }
  scoreDisplay.textContent = `Your score: ${correctCount} / ${quizData.length}`;
  scoreDisplay.style.display = "block";
  finishBtn.style.display = "none";
  nextBtn.style.display = "none";
  backBtn.disabled = true;
  checkBtn.disabled = true;
  questionNav.style.display = "none";
}

window.onload = () => {
  loadQuestion();
};
