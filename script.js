const correctAnswersMap = {
  1: "6",
};

let correctAnswers = 0;
let wrongAnswers = 0;

function checkAnswer(questionNumber) {
  const answerInput = document.querySelector(`input[name='question${questionNumber}']:checked`);
  if (!answerInput) {
      alert("Пожалуйста, выберите ответ!");
      return;
  }
  const answer = answerInput.value;

  if (answer === correctAnswersMap[questionNumber]) {
      alert("Правильно!");
      correctAnswers++;
  } else {
      alert("Неправильно!");
      wrongAnswers++;
  }

  document.getElementById(`question${questionNumber}`).style.display = "none";

  const totalQuestions = Object.keys(correctAnswersMap).length;
  if (questionNumber < totalQuestions) {
      document.getElementById(`question${questionNumber +1}`).style.display = "block";
  } else {
      showResults();
  }
}

function showResults() {
  document.querySelector('.question-container').style.display='none';
  document.getElementById('result').style.display='block';
  document.getElementById('correctCount').textContent=`Правильных ответов: ${correctAnswers}`;
  document.getElementById('wrongCount').textContent=`Неправильных ответов: ${wrongAnswers}`;
}

function restartQuiz() {
  correctAnswers=0;
  wrongAnswers=0;

  for (let i=1; i<=Object.keys(correctAnswersMap).length; i++) {
      document.getElementById(`question${i}`).style.display='block';
      const options=document.querySelectorAll(`input[name='question${i}']`);
      options.forEach(opt=>opt.checked=false);
  }

  document.getElementById('result').style.display='none';
}