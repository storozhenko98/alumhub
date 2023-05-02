const formButton = document.getElementById('formButton');
const formContainer = document.getElementById('formContainer');
const message = document.getElementById('Message');
const subber = document.getElementById('subber');

formButton.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});

subber.addEventListener('click', () => {
  message.innerHTML = 'Thanks for subscribing!';
  //remove all buttons 
  formButton.classList.add('hidden');
});