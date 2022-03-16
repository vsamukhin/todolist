const messageInp = document.querySelector(".message");
const addButton = document.querySelector(".add");
const description = document.querySelector(".description")
const wrapper = document.querySelector(".wrapper")



let tasks = [];

window.addEventListener('load', () => {
  if (localStorage.getItem('todo')) {
    tasks = JSON.parse(localStorage.getItem('todo'))
    const newTodo = tasks.map((item, index) => {
      return { ...item, id: index }
    })
    localStorage.setItem('todo', JSON.stringify(newTodo));
    createTodo();
  } else {
    tasks = [];
  }
})



addButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (messageInp.value, description.value === '') alert('Заполните поля')
  if (messageInp.value && description.value !== '') {
    const newTodos = {
      title: messageInp.value,
      body: description.value,
      checked: false,
    }
    tasks.push(newTodos);
    localStorage.setItem('todo', JSON.stringify(tasks))
    messageInp.value = '';
    description.value = '';
  }
  window.location.reload();
  createTodo();
})

//// создание Tasks

function createTodo() {
  wrapper.innerHTML = "";
  if (tasks.length > 0) {
    filterTask();
    tasks.forEach((item, index, id) => {
      wrapper.innerHTML += addTask(item, index, id);
    })
  } window.reload();
}


function addTask(item, index, id) {
  return `
  <div class="card ${item.checked ? 'checked' : ''}">
   <h2 class="title">${item.title}</h2>
    <div class="card_body">
      <p class="body">${item.body}</p>
    </div>
    <div class="card_btn">
       <button onclick='todoDelete(${index})' class="btn">Удалить</button>
       <div class="card_check">
       <lable class="lable">Выполнено :</lable>
       <input onclick='todoComplete(${index})' class="check" type="checkbox" 
       ${item.checked ? 'checked' : ''}>
       </div>
       <button onclick='todoEdit(${item.id})' class="btn">Редактировать</button>
    </div>
  </div>
`
}

function filterTask() {
  const activeTask = tasks.length && tasks.filter(item => item.checked == false);
  const checkedTask = tasks.length && tasks.filter(item => item.checked == true);
  tasks = [...activeTask, ...checkedTask];
}


function todoComplete(index) {
  const card = document.querySelector(".card");
  tasks[index].checked = !tasks[index].checked;
  if (tasks[index].checked) {
    card.classList.add = 'checked'
  } else {
    card.classList.remove = 'checked'
  }
  localStorage.setItem('todo', JSON.stringify(tasks));
  createTodo();
  window.location.reload();
}


function todoDelete(index) {
  const askdelete = confirm('Вы уверены что хотите удалть ?')
  if (!askdelete) {
    return;
  } else {
    tasks.splice(index, 1);
    localStorage.setItem('todo', JSON.stringify(tasks))
    createTodo();
  }
  window.location.reload();
}

function todoEdit(id) {
  const tasks = JSON.parse(localStorage.getItem('todo'));
  const newTodo = tasks.map(item => {
    if (item.id == id) {
      return {
        ...item,
        title: prompt('Новое название', item.title),
        body: prompt('Новое описание', item.body)
      }
    } else {
      return item
    }
  })
  localStorage.setItem('todo', JSON.stringify(newTodo));
  window.location.reload();
}


const exit = document.querySelector(".exit_btn");
exit.addEventListener('click', (e) => {
  const askExit = confirm('Вы действительно хотите выйти ?')
  if (!askExit) {
    return;
  } else {
    window.open('index.html', '_self')
  }
})
