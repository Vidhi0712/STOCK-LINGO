document.addEventListener("DOMContentLoaded", function () {
  const quizData = [
    {
      question: "Which of the following is an example of revolving credit?",
      options: [
         ",Car loan",
         "Home mortgage",
         "Credit card",
         "Student loan"
      ],
      correct: 2,
      explanation: "Revolving credit lets you borrow, repay, and borrow again—like a credit card—unlike loans that have fixed terms."
    },
    {
      question: " Which type of credit is typically considered installment credit?",
      options: [
        "Credit card",
        "Personal loan",
        "Store credit line",
        "Overdraft"
      ],
      correct: 1,
      explanation: "Installment credit involves borrowing a lump sum and repaying it over time with fixed payments—perfect for big purchases."
    },
    {
      question: " How does a diverse credit mix affect your credit score?",
      options: [
       ",It has no effect",
       ",It lowers your score",
       ",It helps improve your score",
       ",It only matters if you have bad credit"
      ],
      correct: 2,
      explanation: "Credit mix counts for about 10% of your score. Having both revolving and installment credit can show you're a responsible borrower."
    },
    {
      question: " Why might having only one type of credit account limit your credit score potential?",
      options: [
          "Lenders prefer borrowers with one type only",
          "You’ll always be charged higher interest",
          "It shows limited experience in handling credit",
          "It causes hard inquiries"
      ],
      correct: 2,
      explanation: "A healthy credit mix shows lenders that you can manage different kinds of debt responsibly—not just one kind. history usually accounts for around 35% of your credit score, making it the most significant factor."
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
            ? `<a href="" style="margin: 8px; padding: 10px 16px; background-color: #28a745; color: #fff; border: none; border-radius: 12px; font-weight: 600; text-decoration: none; display: inline-block;">Move to Next Module</a>`
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
