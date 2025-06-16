let answers = {
  1: '0', 
  2: '6', 
  3: 'Больше' 
};

let userAnswers = {};
let correctCount = 0;
let wrongCount = 0;
let currentQuestion = 1;

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

  // Проверка  ответа
  if (selectedValue === answers[questionNumber]) {
    correctCount++;
  } else {
    wrongCount++;
  }

  // Переход к следующему вопросу и результатов
  document.getElementById(`question${questionNumber}`).style.display = 'none';

  if (questionNumber < 3) {
    currentQuestion++;
    document.getElementById(`question${currentQuestion}`).style.display = 'block';
  } else {
    showResults();
  }
}

function showResults() {
  // Убедитесь, что контейнеры для вопросов и результатов существуют и видимы
  const questionContainer = document.querySelector('.question-container');
  const resultContainer = document.getElementById('result');

  // Делаем их видимыми
  if (questionContainer) {
    questionContainer.style.display = 'block';
  }

  if (resultContainer) {
    resultContainer.style.display = 'block';
  }

  // Обновляем текстовые элементы с результатами
  const correctCountElement = document.getElementById('correctCount');
  const wrongCountElement = document.getElementById('wrongCount');

  if (correctCountElement) {
    correctCountElement.textContent = `Правильных ответов: ${correctCount}`;
  }

  if (wrongCountElement) {
    wrongCountElement.textContent = `Неправильных ответов: ${wrongCount}`;
  }
}

function restartQuiz() {
  location.reload();
}

function goToOtherGames() {
  window.location.href = '/home_page';
}