     let user = localStorage.getItem('loggedInUser');
    if (!user) {
       user = localStorage.getItem('signedUpUser');
      }

     if (user) {
     document.getElementById('profile-name').innerText = user;
    }
  // ✅ 1. Set correct answers out of 12
  const quizData = {
    jan: 8,
    feb: 9,
    mar: 6,
    apr: 11,
    may: 10,
    jun: 7,
    jul: 12
  };

  const totalQuestions = 12;

  // ✅ 2. Update each bar's height based on % correct
  Object.entries(quizData).forEach(([month, correct]) => {
    const bar = document.querySelector(`.bar-${month}`);
    if (bar) {
      const percent = (correct / totalQuestions) * 100;
      bar.style.height = `${percent * 1.5}px`;  // You can adjust multiplier
      bar.title = `${correct}/${totalQuestions} correct`;
    }
  });

  // ✅ 3. Update the "85%" text to real average
  const totalCorrect = Object.values(quizData).reduce((a, b) => a + b, 0);
  const totalPossible = totalQuestions * Object.keys(quizData).length;
  const averageAccuracy = ((totalCorrect / totalPossible) * 100).toFixed(1);

  document.querySelector('.progress-section .stat-value').textContent = `${averageAccuracy}%`;

  // ✅ Lessons completed per month (out of 5 possible)
  const lessonsData = {
    jan: 0,
    feb: 0,
    mar: 0,
    apr: 1,
    may: 1,
    jun: 0,
    jul: 1
  };

  const maxLessonsPerMonth = 5;

  // ✅ Update bar heights for lessons
  Object.entries(lessonsData).forEach(([month, count]) => {
    const bar = document.querySelector(`.lesson-${month}`);
    if (bar) {
      const percent = (count / maxLessonsPerMonth) * 100;
      bar.style.height = `${percent * 1.5}px`; // Adjust height for visual clarity
      bar.title = `${count}/${maxLessonsPerMonth} lessons`;
    }
  });

  // ✅ Update the "35/50" text
  const totalLessonsCompleted = Object.values(lessonsData).reduce((sum, n) => sum + n, 0);
  const totalLessons = 50;
  document.querySelector('.lessons-section .stat-value').textContent = `${totalLessonsCompleted}/${totalLessons}`;

