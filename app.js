//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const testBtn = document.querySelector('.test');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
testBtn.addEventListener('click', testFn)

//Functions
function addTodo(event) {
    //Prevent from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    //Add to localStorage
    saveLocalTodos(todoInput.value)
    //Check mark button
    const compleatedButton = document.createElement('button');
    compleatedButton.innerHTML = '<i class="fas fa-check"></>'
    compleatedButton.classList.add('complete-btn');
    todoDiv.appendChild(compleatedButton)
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear input
    todoInput.value = '';
}

function deleteCheck(event) {
    // console.log(item)

    const item = event.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        //ANIMATION
        todo.classList.add('fall');
        removeLocalStorage(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })

    }
    //CHECK TODO
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = Array.from(todoList.children); // Convert NodeList to an array
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "block"; // Display all todos
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "block"; // Display completed todos
                } else {
                    todo.style.display = "none"; // Hide incomplete todos
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "block"; // Display completed todos
                } else {
                    todo.style.display = "none"; // Hide incomplete todos
                }
                break;
        }
    });
}


function saveLocalTodos(todo) {
    let todos = [];
    if (localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = [];
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos !== null) {
        try {
            todos = JSON.parse(storedTodos);
        } catch (error) {
            console.error('Error parsing stored todos:', error);
        }
    }

    todos.forEach(function (todo) {
        //Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    
    //Check mark button
    const compleatedButton = document.createElement('button');
    compleatedButton.innerHTML = '<i class="fas fa-check"></>'
    compleatedButton.classList.add('complete-btn');
    todoDiv.appendChild(compleatedButton)
    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    
    });
}

function removeLocalStorage(todo){
    let todos = [];
    if (localStorage.getItem('todos') !== null) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
     
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex,1);
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todos));
}

function testFn(){
    console.log(12)
}





