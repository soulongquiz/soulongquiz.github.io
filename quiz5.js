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
      renderMultipleChoice(q);
    } else if (q.type === "matching") {
      renderMatching(q);
    }
  
    backBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = false;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? "Finish" : "Next";
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
  
  function createFeedback(index) {
    const q = quizData[index];
    const fb = document.createElement("div");
    fb.className = "feedback";
    fb.textContent = answersCorrectness[index] ? q.feedbackCorrect : q.feedbackIncorrect;
    fb.style.color = answersCorrectness[index] ? "#2c6a4f" : "#b33a3a";
    return fb;
  }
  
  function autoCheckAllQuestions() {
    quizData.forEach((q, i) => {
      checkedQuestions.add(i);
      if (q.type === "matching" && !matchAnswersPerQuestion[i]) {
        matchAnswersPerQuestion[i] = {};
      }
      if (answersCorrectness[i] === undefined) {
        if (q.type === "multiple") {
          answersCorrectness[i] = selectedAnswers[i] === q.answer;
        } else if (q.type === "matching") {
          const userPairs = matchAnswersPerQuestion[i];
          const correct = q.pairs.every(pair => userPairs?.[pair.right]?.id === pair.left.id);
          answersCorrectness[i] = correct;
        }
      }
    });
  }
  
  nextBtn.addEventListener("click", () => {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else if (!quizFinished) {
      autoCheckAllQuestions();
      quizFinished = true;
      loadQuestion();
      showScore();
    }
  });
  
  backBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  });
  
  finishBtn.addEventListener("click", () => {
    if (!quizFinished) {
      autoCheckAllQuestions();
      quizFinished = true;
      loadQuestion();
      showScore();
    }
  });
  
  function showScore() {
    const correctCount = Object.values(answersCorrectness).filter(Boolean).length;
    scoreDisplay.textContent = `Your score: ${correctCount} / ${quizData.length}`;
    scoreDisplay.style.display = "block";
    finishBtn.style.display = "none";
    nextBtn.style.display = "none";
    backBtn.disabled = true;
    checkBtn.disabled = true;
    questionNav.style.display = "none";
  }
  
  function renderMultipleChoice(q) {
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "multiple-choice";
  
    q.options.forEach(option => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "option";
      input.value = option;
      input.checked = selectedAnswers[currentQuestion] === option;
  
      input.onchange = () => {
        selectedAnswers[currentQuestion] = option;
      };
  
      label.appendChild(input);
      label.appendChild(document.createTextNode(option));
      optionsContainer.appendChild(label);
      optionsContainer.appendChild(document.createElement("br"));
    });
  
    quizContainer.appendChild(optionsContainer);
  }
  
  function renderMatching(q) {
    const leftColumn = document.createElement("div");
    const rightColumn = document.createElement("div");
    const container = document.createElement("div");
  
    container.className = "matching-container";
    leftColumn.className = "left-column";
    rightColumn.className = "right-column";
  
    const shuffled = shuffleArray(q.pairs.map(pair => pair.right));
    matchAnswersPerQuestion[currentQuestion] = matchAnswersPerQuestion[currentQuestion] || {};
  
    q.pairs.forEach((pair, i) => {
      // Left side (images)
      const leftItem = document.createElement("div");
      const img = document.createElement("img");
      img.src = pair.left.src;
      img.alt = pair.left.id;
      img.className = "match-image";
      leftItem.appendChild(img);
      leftColumn.appendChild(leftItem);
  
      // Right side (dropdowns)
      const rightItem = document.createElement("div");
      const select = document.createElement("select");
  
      const placeholderOption = document.createElement("option");
      placeholderOption.textContent = "-- Select Match --";
      placeholderOption.disabled = true;
      placeholderOption.selected = true;
      select.appendChild(placeholderOption);
  
      shuffled.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        if (matchAnswersPerQuestion[currentQuestion][option]?.id === pair.left.id) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });
  
      select.onchange = () => {
        matchAnswersPerQuestion[currentQuestion][select.value] = pair.left;
      };
  
      rightItem.appendChild(select);
      rightColumn.appendChild(rightItem);
    });
  
    container.appendChild(leftColumn);
    container.appendChild(rightColumn);
    quizContainer.appendChild(container);
  }
  
  checkBtn.addEventListener("click", () => {
    const q = quizData[currentQuestion];
    checkedQuestions.add(currentQuestion);
  
    if (q.type === "multiple") {
      answersCorrectness[currentQuestion] = selectedAnswers[currentQuestion] === q.answer;
    } else if (q.type === "matching") {
      const userPairs = matchAnswersPerQuestion[currentQuestion];
      const correct = q.pairs.every(pair => userPairs?.[pair.right]?.id === pair.left.id);
      answersCorrectness[currentQuestion] = correct;
    }
  
    loadQuestion();
  });
  
  
  window.onload = () => loadQuestion();
  