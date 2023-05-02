const formButton = document.getElementById('formButton');
const formContainer = document.getElementById('formContainer');
const message = document.getElementById('Message');
const subber = document.getElementById('subber');

formButton.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});

