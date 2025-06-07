const currentLetter = 'А';

function checkAnswer(word) {
  const firstLetter = word.charAt(0).toUpperCase();
  const resultDiv = document.getElementById('result');
  if (firstLetter === currentLetter) {
    resultDiv.textContent = 'Правильно! Это слово начинается с буквы ' + currentLetter + '.';
  } else {
    resultDiv.textContent = 'Неправильно. Попробуйте снова.';
  }
}