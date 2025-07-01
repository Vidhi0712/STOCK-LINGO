document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "Which of the following is NOT typically included in your credit report?",
      options: [
        "Your payment history",
        "Your current account balances",
        "Your annual income",
        "Any recent hard credit inquiries"
      ],
      correct: 2,
      explanation: "Credit reports usually include payment history, balances, credit inquiries, and public records, but not your income."
    },
    {
      question: " A “hard inquiry” on your credit report usually happens when:",
      options: [
        "You check your credit score online",
        "A lender reviews your report for a loan or credit card application",
        "A utility company checks your credit before setting up service",
        "A friend uses your name to open an account"
      ],
      correct: 1,
      explanation: " Hard inquiries are made by lenders when you apply for credit and may affect your credit score.."
    },
    {
      question: "What is one way to improve your credit score over time?",
      options: [
        "Closing old credit card accounts",
        "Paying only the minimum balance",
        "Making all payments on time",
        "Frequently opening new credit accounts"
      ],
      correct: 2,
      explanation: "Payment history is the most important factor in your credit score."
    },
    {
      question: " Which credit factor has the highest weight in most credit scoring models?",
      options: [
         "Length of credit history",
         "Payment history",
         "New credit inquiries",
         "Types of credit used"
      ],
      correct: 1,
      explanation: "Payment history usually accounts for around 35% of your credit score, making it the most significant factor."
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
  const canProceed = score > 2;

resultContainer.innerHTML = `
    <div class="result-box" style="text-align: center; padding: 20px;">
      <h2>Quiz Complete!</h2>
      <p>You scored ${score} out of ${quizData.length}.</p>

      <div style="margin-top: 24px;">
        <button onclick="location.reload()" style="margin: 8px; padding: 10px 16px; background-color: #8c45ff; color: #fff; border: none; border-radius: 12px; font-weight: 600;">Restart Quiz</button>
        ${
          canProceed
            ? `<a href="../CONTENT PAGE/content3.html" style="margin: 8px; padding: 10px 16px; background-color: #28a745; color: #fff; border: none; border-radius: 12px; font-weight: 600; text-decoration: none; display: inline-block;">Move to Next Segment</a>`
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
