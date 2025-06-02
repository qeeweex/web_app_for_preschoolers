let correctAnswers = 0;
let wrongAnswers = 0;

function checkAnswer(questionNumber) {
    // Получаем выбранный ответ
    const answerInput = document.querySelector(`input[name='question${questionNumber}']:checked`);
    if (!answerInput) {
        alert("Пожалуйста, выберите ответ!");
        return;
    }
    const answer = answerInput.value;

    // Правильные ответы для каждого вопроса
    const correctAnswersMap = {
        1: "6",
    };

    // Проверка ответа
    if (answer === correctAnswersMap[questionNumber]) {
        alert("Правильно!");
        correctAnswers++;
    } else {
        alert("Неправильно!");
        wrongAnswers++;
    }

    // Переход к следующему вопросу или финал
    document.getElementById(`question${questionNumber}`).style.display = "none";

    if (questionNumber < Object.keys(correctAnswersMap).length) {
        document.getElementById(`question${questionNumber +1}`).style.display = "block";
    } else {
        showResults();
    }
}

function showResults() {
    document.querySelector('.question').style.display = 'none'; // скрываем все вопросы
    document.getElementById('result').style.display = 'block';
    document.getElementById('correctCount').textContent = `Правильных ответов: ${correctAnswers}`;
    document.getElementById('wrongCount').textContent = `Неправильных ответов: ${wrongAnswers}`;
}

function restartQuiz() {
    // Сброс счетчиков
    correctAnswers =0;
    wrongAnswers=0;

    // Скрываем результаты
    document.getElementById('result').style.display='none';

    // Показываем первый вопрос
    for (let i=1; i<=5; i++) {
        document.getElementById(`question${i}`).style.display='none';
        // сбрасываем выбранные ответы
        const options = document.querySelectorAll(`input[name='question${i}']`);
        options.forEach(opt => opt.checked=false);
    }
    
    document.getElementById('question1').style.display='block';
}