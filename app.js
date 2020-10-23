//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");
//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Function
function addTodo(event) {
  event.preventDefault();
  //Add todo to local storage
  saveToLocalStorage(todoInput.value);
  //create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todoDiv");
  todoList.appendChild(todoDiv);
  //create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);
  //Completed button or check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class='fas fa-check'></i>`;
  completedButton.classList.add("completed-button");
  todoDiv.appendChild(completedButton);
  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  //clear Input Box
  todoInput.value = "";
}

//Delete Check Function

function deleteCheck(e) {
  var item = e.target;
  if (item.classList[0] === "trash-button") {
    item.parentNode.classList.add("fall");
    item.parentNode.addEventListener("transitionend", function () {
      item.parentNode.remove();
    });
    removeFromLocalStorage(item);
  }

  if (item.classList[0] === "completed-button") {
    item.parentNode.classList.toggle("completed");
  }
}

// Filter Todo function
filterTodo.addEventListener("click", function filterTodoFunction(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex"; /***** */
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
});

// Save to local storage

function saveToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");
    todoList.appendChild(todoDiv);
    //create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    //Completed button or check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class='fas fa-check'></i>`;
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class='fas fa-trash'></i>`;
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
  });
}

function removeFromLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
