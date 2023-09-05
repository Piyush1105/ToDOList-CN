// Getting values from id and class
const inputTask = document.querySelector('#input');
const taskList = document.getElementById('list');
const count = document.getElementById('taskCount');

// Array to store the data of todolist
let toDoList = [];
let originalToDoList = [];
let completedTasks = [];
let incompleteTasks = [];
// Change the event from 'keydown' to 'keyup' or 'keypress'
inputTask.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    subButton();
  }
});

// Event listener for all the buttons on the page
document.addEventListener('click', handler);

// Function for handling various events
function handler(e) {
  const target = e.target;
  if (target.className === 'fa fa-plus-circle add') {
    subButton();
  } else if (target.className === 'fa fa-trash-o') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
  } else if (target.className === 'check') {
    const taskId = target.id;
    markDone(taskId);
  } else if (target.className === 'incomplete') {
    showIncompleteTasks();
  } else if (target.className === 'completed') {
    showCompletedTasks();
  } else if (target.className === 'showAll') {
    showAllTasks(); // Handle "Show All" button click
  } else if (target.className === 'fa-solid fa-check-double dobCheck') {
    markAllTasksDone();
  } else if (target.className === 'deltAll') {
  deleteAllCompletedTasks(); // Call the new function
}
}


// Function to add a task to the list
function subButton() {
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

// Function to add a task to the array
function addTask(task) {
  if (task) {
    originalToDoList.push(task); // Update the original task list
    toDoList.push(task); // Update the displayed list
    Data();
    alert("Task added.");
    return;
  } else {
    alert("Task Not added!");
  }
}

// Function to update the UI with the task data
function Data() {
  taskList.innerHTML = '';
  for (let i = 0; i < toDoList.length; i++) {
    renderList(toDoList[i]);
  }
  count.innerHTML = toDoList.length;
}

// Function to render a task in the list
function renderList(task) {
  const li = document.createElement('li');

  li.setAttribute('class', 'task');
  li.setAttribute('data-key', task.id);

  if (task.done === true) {
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

// Function to delete a task
function deleteTask(id) {
  const newTasks = toDoList.filter(function (task) {
    return task.id !== id;
  });
  toDoList = newTasks;
  Data();
}

// Function to mark a task as done
function markDone(id) {
  const task = toDoList.find(function (task) {
    return task.id === id;
  });
  if (task) {
    task.done = !task.done;
    // Move the task to the appropriate array based on completion status
    if (task.done) {
      completedTasks.push(task);
      incompleteTasks = incompleteTasks.filter(function (incompleteTask) {
        return incompleteTask.id !== task.id;
      });
    } else {
      incompleteTasks.push(task);
      completedTasks = completedTasks.filter(function (completedTask) {
        return completedTask.id !== task.id;
      });
    }
    Data();
  }
}

// Function to show incomplete tasks
function showIncompleteTasks() {
  toDoList = originalToDoList.filter(function (task) {
    return !task.done;
  });
  Data();
}

// Function to show completed tasks
function showCompletedTasks() {
  toDoList = completedTasks.slice();
  Data();
}


// Function to mark all tasks as done
function markAllTasksDone() {
  toDoList.forEach(function (task) {
    task.done = true;
  });

  // Update the completedTasks and incompleteTasks arrays
  completedTasks = originalToDoList.slice(); // All tasks are completed
  incompleteTasks = [];

  Data();
}

// Function to delete all completed tasks from everywhere
function deleteAllCompletedTasks() {
  const newTasks = originalToDoList.filter(function (task) {
    return !task.done;
  });

  toDoList = newTasks;
  originalToDoList = newTasks;
  completedTasks = [];
  incompleteTasks = [];

  Data();
}


// Function to show all tasks
function showAllTasks() {
  toDoList = originalToDoList.slice(); // Use the original list to show all tasks
  updateCompletedAndIncompleteTasks();
  Data();
}

// Function to update completedTasks and incompleteTasks arrays
function updateCompletedAndIncompleteTasks() {
  completedTasks = originalToDoList.filter(function (task) {
    return task.done;
  });

  incompleteTasks = originalToDoList.filter(function (task) {
    return !task.done;
  });
}
