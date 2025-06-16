let answers = {
  1: '6', 
  2: '120', 
  3: '10',
  4: '5' 
};

let userAnswers = {};
let correctCount = 0;
let wrongCount = 0;
let currentQuestion = 1;
const totalQuestions = Object.keys(answers).length;

function checkAnswer(questionNumber) {
  const options = document.querySelectorAll(`#question${questionNumber} input[type="radio"]`);
  let selectedValue = null;
  for (const option of options) {
    if (option.checked) {
      selectedValue = option.value;
      break;
    }
  }

  if (selectedValue === null) {
    alert('Пожалуйста, выберите ответ.');
    return;
  }

  userAnswers[questionNumber] = selectedValue;

  // Проверка ответа
  if (selectedValue === answers[questionNumber]) {
    correctCount++;
  } else {
    wrongCount++;
  }

  // Скрываем текущий вопрос
  document.getElementById(`question${questionNumber}`).style.display = 'none';

  // Если есть следующий вопрос, показываем его, иначе показываем результат
  if (questionNumber < totalQuestions) {
    currentQuestion++;
    const nextQuestion = document.getElementById(`question${currentQuestion}`);
    if (nextQuestion) nextQuestion.style.display = 'block';
  } else {
    showResults();
  }
}

function showResults() {
  // Скрываем все вопросы внутри контейнера
  const questionContainer = document.querySelector('.question-container');
  if (questionContainer) {
    questionContainer.style.display = 'flex';
    const questions = questionContainer.querySelectorAll('.question');
    questions.forEach(q => q.style.display = 'none');
  }

  // Показываем блок с результатом
  let resultContainer = document.getElementById('result');
  if (!resultContainer) {
    // Если блока нет, создаём его
    resultContainer = document.createElement('div');
    resultContainer.id = 'result';
    questionContainer.appendChild(resultContainer);
  }
  resultContainer.style.display = 'flex';

  let message = '';
  if (wrongCount === 0) {
    message = `<div class="success">Молодец! Все ответы верны!</div>`;
  } else {
    message = `<div class="fail">Есть ошибки, попробуй ещё раз!</div>`;
  }

  resultContainer.innerHTML = `
    <h2>Результат</h2>
    ${message}
    <p>Правильных ответов: ${correctCount} из ${totalQuestions}</p>
    <button onclick="restartQuiz()">Пройти ещё раз</button>
    <button onclick="goToOtherGames()">Другие игры</button>
  `;
}

function restartQuiz() {
  location.reload();
}

function goToOtherGames() {
  window.location.href = '/home_page';
}