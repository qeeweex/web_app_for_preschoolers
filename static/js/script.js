let answers = {
  1: '6', // правильный ответ на первый вопрос
  2: '2'  // правильный ответ на второй вопрос
};

let userAnswers = {};
let correctCount = 0;
let wrongCount = 0;

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
  if (questionNumber === 1) {
    document.getElementById('question1').style.display = 'none';
    document.getElementById('question2').style.display = 'block';
  } else if (questionNumber === 2) {
    showResults();
  }
}

function showResults() {
  document.querySelector('.question-container').style.display = 'none';
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';

  document.getElementById('correctCount').textContent = 'Правильных ответов: ' + correctCount;
  document.getElementById('wrongCount').textContent = 'Неправильных ответов: ' + wrongCount;

  // Отобразить ошибки
  let mistakes = '';
  for (const q in answers) {
    if (userAnswers[q] !== answers[q]) {
      mistakes += `В вопросе ${q} был выбран неправильный ответ.<br>`;
    }
  }
  document.getElementById('mistakes').innerHTML = mistakes || 'Ошибок нет.';
}

function restartQuiz() {
  // Обнуляем переменные
  userAnswers = {};
  correctCount = 0;
  wrongCount = 0;

  // Возвращаемся к первому вопросу
  document.getElementById('question1').style.display = 'block';
  document.getElementById('question2').style.display = 'none';

  // Скрываем результаты
  document.getElementById('result').style.display = 'none';

  // Снимаем выборы
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(r => r.checked = false);
}

function goToOtherGames() {
  alert('Переход к другим играм...');
}