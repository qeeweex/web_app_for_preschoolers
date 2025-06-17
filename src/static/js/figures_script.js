let answers = {
  1: 'Треугольник, 3 угла', 
  2: 'солнце',
  3: '4', 
  4: '4'
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
  // Скрываем контейнер с вопросами
  const questionContainer = document.querySelector('.question-container');
  if (questionContainer) {
    questionContainer.style.display = 'flex';
    // Скрываем все вопросы внутри контейнера
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
  resultContainer.innerHTML = `
    <h2>Результат</h2>
    <div class="${wrongCount === 0 ? 'success' : 'fail'}">
      ${wrongCount === 0 
        ? 'Молодец! Все ответы верны!' 
        : 'Есть ошибки, попробуй ещё раз!'}
    </div>
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