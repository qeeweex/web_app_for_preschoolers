let answers = {
  1: '6', // правильный ответ на первый вопрос
  2: '2', // правильный ответ на второй вопрос
  3: '10' // исправленный правильный ответ на третий вопрос
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

  // Проверка правильности ответа
  if (selectedValue === answers[questionNumber]) {
    correctCount++;
  } else {
    wrongCount++;
  }

  // Переход к следующему вопросу или отображение результатов
  document.getElementById(`question${questionNumber}`).style.display = 'none';

  if (questionNumber < 3) {
    currentQuestion++;
    document.getElementById(`question${currentQuestion}`).style.display = 'block';
  } else {
    showResults();
  }
}

function showResults() {
  document.querySelector('.question-container').style.display = 'block';
  document.getElementById('result').style.display = 'block';

  document.getElementById('correctCount').textContent = `Правильных ответов: ${correctCount}`;
  document.getElementById('wrongCount').textContent = `Неправильных ответов: ${wrongCount}`;
  // Можно добавить отображение ошибок или других данных
}

function restartQuiz() {
  // Перезагрузка страницы или сброс переменных
  location.reload();
}

function goToOtherGames() {
  // Реализуйте переход к другим играм
}