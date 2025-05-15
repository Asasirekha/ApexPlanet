const todoList = JSON.parse(localStorage.getItem('todoList')) || [
    {
      Name: 'dinner',
      dueDate: '2025-02-20',
    },
  ];
  
  function renderTodoList() {
    let todoListHTML = '';
  
    todoList.forEach(function (todoObject, index) {
      const Name = todoObject.Name;
      const dueDate = todoObject.dueDate;
      const html = `
        <div>${Name}</div> 
        <div>${dueDate}</div> 
        <button class="delete-todo-button js-delete-btn">DELETE</button>
      `;
      todoListHTML += html;
    });
  
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  
    document.querySelectorAll('.js-delete-btn').forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
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
    });
  
    inputElement.value = '';
    dateInputElement.value = '';
  
    saveStorage();
    renderTodoList();
  }
  
  function saveStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
  
  // Add event listener to Add button only once
  document.querySelector('.js-add-todo-btn').addEventListener('click', addtodoList);
  
  // Initial render
  renderTodoList();
  