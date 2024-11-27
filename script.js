let tasks = [];
let taskId = 0; // Unique ID for each task

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!taskText) {
    alert('Please enter a task.');
    return;
  }

  tasks.push({
    id: taskId++, // Assign unique ID to each task
    text: taskText,
    priority: priority,
    flagged: false,
  });

  taskInput.value = '';
  renderTasks();
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) =>
      filterPriority.value === 'all' ? true : task.priority === filterPriority.value
    )
    .sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  // Render each task
  filteredTasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = task.priority;

    li.innerHTML = `
      <input type="checkbox" data-id="${task.id}">
      <span>${task.text}</span>
      <span class="flag" data-id="${task.id}">${task.flagged ? '🚩' : '⚑'}</span>
      <button data-id="${task.id}">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

// Handle Task Actions
taskList.addEventListener('click', (e) => {
  const taskId = parseInt(e.target.dataset.id);

  if (e.target.tagName === 'INPUT') {
    // Remove task when marked complete
    tasks = tasks.filter((task) => task.id !== taskId);
  } else if (e.target.tagName === 'BUTTON') {
    // Delete task
    tasks = tasks.filter((task) => task.id !== taskId);
  } else if (e.target.classList.contains('flag')) {
    // Toggle flag
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.flagged = !task.flagged;
    }
  }

  renderTasks();
});

// Filter Tasks
filterPriority.addEventListener('change', renderTasks);
