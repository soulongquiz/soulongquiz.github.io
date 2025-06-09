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
          clearFeedback();
        }
      };
      li.appendChild(btn);
      optionsList.appendChild(li);
    });
    quizContainer.appendChild(optionsList);
  } else if (q.type === "matching") {
    // Shuffle left side (images), preserving original right side
    const shuffledLefts = shuffleArray(q.pairs.map(pair => pair.left));
    const pairsShuffledLeft = shuffledLefts.map((left, i) => ({
      left,
      right: q.pairs[i].right
    }));
  
    renderMatching({ ...q, pairs: pairsShuffledLeft });
  }

  backBtn.disabled = currentQuestion === 0;

  if (currentQuestion === quizData.length - 1) {
    nextBtn.style.display = "none";
    finishBtn.style.display = quizFinished ? "none" : "inline-block";
  } else {
    nextBtn.style.display = "inline-block";
    finishBtn.style.display = "none";
    nextBtn.disabled = false;
  }

  checkBtn.style.display = quizFinished ? "none" : "inline-block";

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
    currentQuestion++;
    autoCheckAllQuestions();
    quizFinished = true;
    loadQuestion();
    showScore();
    renderQuestionNav();
  }
});

function autoCheckAllQuestions() {
  for (let i = 0; i < quizData.length; i++) {
    checkedQuestions.add(i);

    if (quizData[i].type === "multiple") {
      // If no answer selected, mark incorrect explicitly
      if (!selectedAnswers[i]) {
        answersCorrectness[i] = false;
      } else {
        answersCorrectness[i] = selectedAnswers[i] === quizData[i].answer;
      }
    } else if (quizData[i].type === "matching") {
      if (!matchAnswersPerQuestion[i]) {
        matchAnswersPerQuestion[i] = {};
      }
      let isCorrect = true;
      for (const pair of quizData[i].pairs) {
        const matched = matchAnswersPerQuestion[i][pair.right];
        if (!matched || matched.id !== pair.left.id) {
          isCorrect = false;
          break;
        }
      }
      answersCorrectness[i] = isCorrect;
    }
  }
}

checkBtn.onclick = () => {
  if (quizFinished) return; // no checking after finish

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
//questionNav.style.display = "none";
}

function createFeedback(qIndex) {
  const fb = document.createElement("div");
  fb.classList.add("feedback");
  if (answersCorrectness[qIndex] === true) {
    fb.textContent = quizData[qIndex].feedbackCorrect;
    fb.style.color = "#2c6a4f";
  } else if (answersCorrectness[qIndex] === false) {
    fb.textContent = quizData[qIndex].feedbackIncorrect;
    fb.style.color = "#b33a3a";
  }
  return fb;
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

function renderMatching(question) {
  const container = document.createElement("div");
  container.classList.add("match-container");

  // Ensure storage object exists
  if (!matchAnswersPerQuestion[currentQuestion]) {
    matchAnswersPerQuestion[currentQuestion] = {};
  }
  const userMatches = matchAnswersPerQuestion[currentQuestion];

  // Build map of left items that are already matched
  const matchedLeftIds = new Set(
    Object.values(userMatches).map(match => match.id)
  );

  question.pairs.forEach(pair => {
    const row = document.createElement("div");
    row.classList.add("match-row");

    // Left (draggable) item
    const leftItem = document.createElement("div");
    leftItem.classList.add("left-box");

    // Only render if not already matched
    if (!matchedLeftIds.has(pair.left.id)) {
      const div = document.createElement("div");
      div.classList.add("draggable");
      div.draggable = !checkedQuestions.has(currentQuestion) && !quizFinished;
      div.id = pair.left.id;

      if (pair.left.type === "image") {
        const img = document.createElement("img");
        img.src = pair.left.src;
        img.alt = pair.left.id;
        div.appendChild(img);
      } else {
        div.textContent = pair.left.id;
      }

      leftItem.appendChild(div);
    }

    // Right (droppable) item
    const rightItem = document.createElement("div");
    rightItem.classList.add("droppable");
    rightItem.dataset.matchId = pair.right;
    rightItem.textContent = pair.right;

    // If already matched, restore the draggable
    const existing = userMatches[pair.right];
    if (existing) {
      const droppedDiv = document.createElement("div");
      droppedDiv.classList.add("draggable");
      droppedDiv.id = existing.id;
      droppedDiv.draggable = !checkedQuestions.has(currentQuestion) && !quizFinished;

      if (existing.src || pair.left.type === "image") {
        const img = document.createElement("img");
        img.src = existing.src || pair.left.src;
        img.alt = existing.id;
        droppedDiv.appendChild(img);
      } else {
        droppedDiv.textContent = existing.id;
      }

      // Replace placeholder text
      rightItem.textContent = pair.right;
      rightItem.appendChild(droppedDiv);
    }

    row.appendChild(leftItem);
    row.appendChild(rightItem);
    container.appendChild(row);
  });

  quizContainer.appendChild(container);
  setTimeout(setupDragAndDrop, 0);
}



function setupDragAndDrop() {
  const draggables = document.querySelectorAll(".draggable");
  const droppables = document.querySelectorAll(".droppable");

  // Make draggable items behave correctly
  draggables.forEach(drag => {
    drag.draggable = !(checkedQuestions.has(currentQuestion) || quizFinished);

    drag.addEventListener("dragstart", e => {
      if (!drag.draggable) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", drag.id);
      setTimeout(() => {
        drag.style.display = "none";
      }, 0);
    });

    drag.addEventListener("dragend", e => {
      e.target.style.display = "flex";
      e.target.style.visibility = "visible";
    });
  });

  // Handle drops on the right-side (matching) boxes
  droppables.forEach(drop => {
    drop.addEventListener("dragover", e => {
      if (checkedQuestions.has(currentQuestion) || quizFinished) return;
      e.preventDefault();
      drop.style.backgroundColor = "#d4edda";
    });

    drop.addEventListener("dragleave", () => {
      drop.style.backgroundColor = "#f9f9f9";
    });

    drop.addEventListener("drop", e => {
      if (checkedQuestions.has(currentQuestion) || quizFinished) return;
      e.preventDefault();
      drop.style.backgroundColor = "#f9f9f9";

      const id = e.dataTransfer.getData("text/plain");
      const draggedElem = document.getElementById(id);
      if (!draggedElem) return;

      // Remove dragged from old parent if it's already in a droppable
      const oldParent = draggedElem.parentElement;
      if (oldParent && oldParent.classList.contains("droppable")) {
        oldParent.removeChild(draggedElem);
        // Unhide left-side clone
        const leftClone = document.querySelector(`.left-box #${id}`);
        if (leftClone) leftClone.style.visibility = "visible";
      }

      // Remove existing item in this drop box if any
      const existing = drop.querySelector(".draggable");
      if (existing) {
        drop.removeChild(existing);
        const restoreClone = document.querySelector(`.left-box #${existing.id}`);
        if (restoreClone) restoreClone.style.visibility = "visible";

        if (matchAnswersPerQuestion[currentQuestion]) {
          delete matchAnswersPerQuestion[currentQuestion][drop.dataset.matchId];
        }
      }

      drop.appendChild(draggedElem);
      draggedElem.style.display = "flex";
      draggedElem.style.visibility = "visible";

      // Hide the left-side copy
      const leftOriginal = document.querySelector(`.left-box #${id}`);
      if (leftOriginal) leftOriginal.style.visibility = "hidden";

      // Save match
      if (!matchAnswersPerQuestion[currentQuestion]) {
        matchAnswersPerQuestion[currentQuestion] = {};
      }
      const imgElem = draggedElem.querySelector("img");
      matchAnswersPerQuestion[currentQuestion][drop.dataset.matchId] = {
        id: draggedElem.id,
        src: imgElem ? imgElem.src : null,
      };

      clearFeedback();
    });
  });

  // Handle dragging items back to the left side (unassign)
  const leftList = document.getElementById("left-list");
  leftList.addEventListener("dragover", e => e.preventDefault());

  leftList.addEventListener("drop", e => {
    if (checkedQuestions.has(currentQuestion) || quizFinished) return;

    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const draggedElem = document.getElementById(id);
    if (!draggedElem) return;

    // Only remove if it came from a right-side drop zone
    const oldParent = draggedElem.parentElement;
    if (oldParent && oldParent.classList.contains("droppable")) {
      oldParent.removeChild(draggedElem);

      const leftClone = document.querySelector(`.left-box #${id}`);
      if (leftClone) {
        leftClone.style.visibility = "visible";
      }

      if (matchAnswersPerQuestion[currentQuestion]) {
        for (const key in matchAnswersPerQuestion[currentQuestion]) {
          if (matchAnswersPerQuestion[currentQuestion][key].id === id) {
            delete matchAnswersPerQuestion[currentQuestion][key];
          }
        }
      }

      draggedElem.style.display = "flex";
      draggedElem.style.visibility = "visible";

      clearFeedback();
    }
  });
}


window.onload = () => {
  loadQuestion();
  finishBtn.disabled = false;
  finishBtn.style.display = "none";  // hidden initially
};


