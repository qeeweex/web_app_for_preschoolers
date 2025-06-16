const container = document.getElementById('container');
const toSignIn = document.getElementById('toSignIn');
const toSignUp = document.getElementById('toSignUp');

if (toSignIn) {
    toSignIn.addEventListener('click', () => {
        container.classList.add('show-signin');
    });
}
if (toSignUp) {
    toSignUp.addEventListener('click', () => {
        container.classList.remove('show-signin');
    });
}