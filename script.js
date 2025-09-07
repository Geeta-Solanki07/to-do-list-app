const addButton = document.getElementById("add-button");
const deleteAllButton = document.getElementById("delete-all");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");
    span.addEventListener("click", () => toggleComplete(index));

    const actions = document.createElement("div");
    actions.classList.add("todo-actions");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️ Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editTask(index));

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌ Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => deleteTask(index));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    todoList.appendChild(li);
  });
}

// Add task
function addTask() {
  const text = todoInput.value.trim();
  if (text === "") {
    alert("Task cannot be empty!");
    return;
  }
  tasks.push({ text: text, completed: false });
  todoInput.value = "";
  saveTasks();
  renderTasks();
}

// Toggle complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Delete all
function deleteAll() {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

addButton.addEventListener("click", addTask);
deleteAllButton.addEventListener("click", deleteAll);

// Enter key shortcut
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();
