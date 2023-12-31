// Get references to HTML elements
const inputTask = document.querySelector('#input');
const taskList = document.getElementById('list');
const count = document.getElementById('taskCount');

// Arrays to store task data
let toDoList = [];
let originalToDoList = [];
let completedTasks = [];
let incompleteTasks = [];

// Event listener for input field to add a task
inputTask.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTaskFromInput();
  }
});

// Event listener for all buttons on the page
document.addEventListener('click', handleButtonClick);

// Handle various button clicks
function handleButtonClick(e) {
  const target = e.target;
  // Check the class of the clicked element
  switch (target.className) {
    case 'fa fa-plus-circle add':
      addTaskFromInput();
      break;
    case 'fa fa-trash-o':
      deleteTask(target.dataset.id);
      break;
    case 'check':
      markTaskAsDone(target.id);
      break;
    case 'incomplete':
      showIncompleteTasks();
      break;
    case 'completed':
      showCompletedTasks();
      break;
    case 'showAll':
      showAllTasks();
      break;
    case 'fa-solid fa-check-double dobCheck':
      markAllTasksDone();
      break;
    case 'deltAll':
      deleteAllCompletedTasks();
      break;
  }
}

// Function to add a task when the Enter key is pressed
function addTaskFromInput() {
  let value = inputTask.value;
  if (value === '') {
    alert('Enter the task');
    return;
  }
  const task = {
    name: value,
    id: Date.now().toString(),
    done: false,
  };
  addTask(task);
  inputTask.value = '';
}

// Function to add a task to the list and update data
function addTask(task) {
  if (task) {
    originalToDoList.push(task);
    toDoList.push(task);
    updateUI();
    alert("Task added.");
  } else {
    alert("Task not added!");
  }
}

// Function to update the UI with task data
function updateUI() {
  taskList.innerHTML = '';
  for (let i = 0; i < toDoList.length; i++) {
    renderTask(toDoList[i]);
  }
  count.innerHTML = toDoList.length;
}

// Function to render a task in the list
function renderTask(task) {
  const li = document.createElement('li');
  li.setAttribute('class', 'task');
  li.setAttribute('data-key', task.id);

  if (task.done) {
    li.classList.add('checked');
  }

  li.innerHTML = `<input type="checkbox" class="check" id="${task.id}" ${
    task.done ? 'checked' : ''
  }>
  <label for="${task.id}">${task.name}</label>
  <button class="but">
    <i class="fa fa-trash-o" aria-hidden="true" data-id="${task.id}"></i>
  </button>`;
  taskList.append(li);
}

// Function to delete a task and update data
function deleteTask(id) {
  // Find the task that matches the given id
  const taskIndex = toDoList.findIndex((task) => task.id === id);

  if (taskIndex !== -1) {
    // Check if the task is completed
    const isCompleted = toDoList[taskIndex].done;

    // Remove the task from the toDoList
    toDoList.splice(taskIndex, 1);

    // Remove the task from the originalToDoList as well
    originalToDoList = originalToDoList.filter((task) => task.id !== id);

    // If the task is completed, also remove it from completedTasks
    if (isCompleted) {
      completedTasks = completedTasks.filter((task) => task.id !== id);
    }

    updateUI();
  }
}


// Function to mark a task as done and update data
function markTaskAsDone(id) {
  const task = toDoList.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
    updateCompletedAndIncompleteTasks();
    updateUI();
  }
}

// Function to filter and show incomplete tasks
function showIncompleteTasks() {
  toDoList = originalToDoList.filter((task) => !task.done);
  updateUI();
}

// Function to filter and show completed tasks
function showCompletedTasks() {
  toDoList = completedTasks.slice();
  updateUI();
}

// Function to mark all tasks as done and update data
function markAllTasksDone() {
  toDoList.forEach((task) => (task.done = true));
  completedTasks = originalToDoList.slice();
  incompleteTasks = [];
  updateUI();
}

// Function to delete all completed tasks and update data
function deleteAllCompletedTasks() {
  originalToDoList = originalToDoList.filter((task) => !task.done);
  toDoList = originalToDoList.slice();
  completedTasks = [];
  incompleteTasks = [];
  updateUI();
}

// Function to show all tasks
function showAllTasks() {
  toDoList = originalToDoList.slice();
  updateUI();
}

// Function to update completedTasks and incompleteTasks arrays
function updateCompletedAndIncompleteTasks() {
  completedTasks = originalToDoList.filter((task) => task.done);
  incompleteTasks = originalToDoList.filter((task) => !task.done);
}
