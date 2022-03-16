//анимация авторизации и регистрации

const signInBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');
const formBox = document.querySelector('.form-box');

signUpBtn.addEventListener('click', function () {
  formBox.classList.add('active');
});

signInBtn.addEventListener('click', function () {
  formBox.classList.remove('active');
});

//авторизация и регистрация 


function signup(e) {
  event.preventDefault();


  const username = document.querySelector('#user_name').value;
  const password = document.querySelector('#pass_word').value;
  const email = document.querySelector('#email').value;

  const user = {
    email: email,
    username: username,
    password: password
  };

  const json = JSON.stringify(user);
  localStorage.setItem(username, json);
  alert('Welcome')
  window.open('todo.html', '_self')
}

function loginFunc(e) {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const user = localStorage.getItem(username);
  const data = JSON.parse(user);
  console.log(data)

  if (user == null) {
    alert("fill in the fields");
  } if (username == data.username && password == data.password) {
    alert('Welcom')
    window.open('todo.html', '_self')
  }
}
