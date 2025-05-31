const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function renderTodoList() {
  let todoListHTML = '';
  let pendingCount = 0;

  todoList.forEach(function (todoObject, index) {
    const { Name, dueDate, completed } = todoObject;

    if (!completed) pendingCount++;

    const checked = completed ? 'checked' : '';
    const textStyle = completed ? 'text-decoration: line-through; color: gray;' : '';

    const html = `
      <div class="todo-item">
        <input type="checkbox" class="js-complete-checkbox" data-index="${index}" ${checked} />
        <div style="${textStyle}">${Name}</div>
        <div style="${textStyle}">${dueDate}</div>
        <button class="delete-todo-button js-delete-btn" data-index="${index}">DELETE</button>
      </div>
    `;

    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  document.querySelector('.js-task-counter').textContent = pendingCount;

  document.querySelectorAll('.js-delete-btn').forEach((button) => {
    const index = button.dataset.index;
    button.addEventListener('click', () => {
      todoList.splice(index, 1);
      saveStorage();
      renderTodoList();
    });
  });

  document.querySelectorAll('.js-complete-checkbox').forEach((checkbox) => {
    const index = checkbox.dataset.index;
    checkbox.addEventListener('change', () => {
      todoList[index].completed = checkbox.checked;
      saveStorage();
      renderTodoList();
    });
  });
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    addtodoList();
  }
}

function addtodoList() {
  const inputElement = document.querySelector('.js-input');
  const Name = inputElement.value.trim();
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if (!Name) {
    alert('Please enter a todo name');
    return;
  }

  if (!dueDate) {
    alert('Please select a due date');
    return;
  }

  todoList.push({
    Name: Name,
    dueDate: dueDate,
    completed: false,
  });

  inputElement.value = '';
  dateInputElement.value = '';

  saveStorage();
  renderTodoList();
}

function saveStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

document.querySelector('.js-add-todo-btn').addEventListener('click', addtodoList);

document.querySelector('.js-clear-completed').addEventListener('click', () => {
  const filtered = todoList.filter(todo => !todo.completed);
  todoList.length = 0;
  todoList.push(...filtered);
  saveStorage();
  renderTodoList();
});

renderTodoList();
