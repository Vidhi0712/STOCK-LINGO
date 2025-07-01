document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "What is the first step in creating a budget?",
      options: [
        "Track your income and expenses",
        "Set financial goals",
        "Create a savings plan",
        "Invest in stocks"
      ],
      correct: 0,
      explanation: "Tracking your income and expenses is the foundation of budgeting."
    },
    {
      question: "Why is an emergency fund important?",
      options: [
        "To go shopping",
        "To cover unexpected expenses",
        "To invest in crypto",
        "To take out a loan"
      ],
      correct: 1,
      explanation: "It helps cover sudden costs like medical bills or job loss without debt."
    },
    {
      question: "Which of the following is a fixed expense?",
      options: [
        "Grocery bills",
        "Movie tickets",
        "Car loan payment",
        "Electricity usage"
      ],
      correct: 2,
      explanation: "A fixed expense is something that stays the same every month."
    },
    {
      question: "What does 'pay yourself first' mean?",
      options: [
        "Spend on entertainment",
        "Save before spending",
        "Pay bills first",
        "Use a credit card"
      ],
      correct: 1,
      explanation: "It means saving a portion of income before paying for other expenses."
    }
  ];
  const nextBtn = document.getElementById("next");

  const questionEl = document.getElementById("question");
  const optionsEls = document.querySelectorAll(".option");
  const submitBtn = document.getElementById("submit");
  const feedbackEl = document.getElementById("feedback");
  const didYouKnowEl = document.getElementById("did-you-know");
  const feedbackSection = document.querySelector(".feedback-section");
  const progressText = document.querySelector(".progress-text");
  const progressBar = document.getElementById("progress");

  let currentQuestion = 0;
  let score = 0;

  loadQuestion();

  function loadQuestion() {
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEls.forEach((el, idx) => {
      el.classList.remove("selected", "correct", "incorrect");
      el.querySelector("input").checked = false;
      el.querySelector(".option-text").textContent = current.options[idx];
    });

    feedbackSection.style.display = "none";
    feedbackEl.textContent = "";
    didYouKnowEl.textContent = "";
    progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;
  }

  optionsEls.forEach((option) => {
    option.addEventListener("click", function () {
      optionsEls.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      this.querySelector("input").checked = true;
    });
  });

  submitBtn.addEventListener("click", () => {
    const selectedIndex = Array.from(optionsEls).findIndex((el) =>
      el.querySelector("input").checked
    );

    if (selectedIndex === -1) {
      alert("Please select an option.");
      return;
    }

    const current = quizData[currentQuestion];
    feedbackSection.style.display = "block";
    feedbackSection.classList.add("fade-in");

    optionsEls.forEach((el, idx) => {
      el.classList.remove("correct", "incorrect");
      if (idx === current.correct) {
        el.classList.add("correct");
      } else if (idx === selectedIndex) {
        el.classList.add("incorrect");
      }
    });

    if (selectedIndex === current.correct) {
      feedbackEl.textContent = "✅ Correct! " + current.explanation;
      score++;
    } else {
      feedbackEl.textContent = "❌ Oops! " + current.explanation;
    }

    didYouKnowEl.textContent = current.explanation;

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      nextBtn.style.display = "inline-block";
    } else {
      nextBtn.textContent = "See Results";
      nextBtn.style.display = "inline-block";
    }

    progressBar.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
  });

  // ✅ "Next" button event listener added safely
  nextBtn.addEventListener("click", () => {
    nextBtn.style.display = "none";
    feedbackSection.classList.remove("fade-in");

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });

function showResults() {
  const resultContainer = document.querySelector(".quiz-container");
  const canProceed = score > 3;

  resultContainer.innerHTML = `
    <div class="result-box" style="text-align: center; padding: 20px;">
      <h2>Quiz Complete!</h2>
      <p>You scored ${score} out of ${quizData.length}.</p>

      <div style="margin-top: 24px;">
        <button onclick="location.reload()" style="margin: 8px; padding: 10px 16px; background-color: #8c45ff; color: #fff; border: none; border-radius: 12px; font-weight: 600;">Restart Quiz</button>
        ${
          canProceed
            ? `<a href="../content/content2.html" style="margin: 8px; padding: 10px 16px; background-color: #28a745; color: #fff; border: none; border-radius: 12px; font-weight: 600; text-decoration: none; display: inline-block;">Move to Next Segment</a>`
            : `<button disabled style="margin: 8px; padding: 10px 16px; background-color: #ccc; color: #666; border: none; border-radius: 12px; font-weight: 600;">Score > 3 to Proceed</button>`
        }
      </div>
    </div>
  `;
}


function goToNextSegment() {
  // Replace with your segment logic — for now, just an alert
  alert("Moving to next segment...");
  // Example: window.location.href = "next-segment.html";
}

});
