document.addEventListener('DOMContentLoaded', function() {
  // Get references to the buttons and the container
  const addNewBtn = document.querySelector('.white');
  const urgentImportantBtn = document.querySelector('.green');
  const urgentNotImportantBtn = document.querySelector('.blue');
  const notUrgentImportantBtn = document.querySelector('.yellow');
  const notUrgentNotImportantBtn = document.querySelector('.red');
  const container = document.querySelector('.container');

  let savedTasks = []; // Array to store the saved tasks

  container.innerHTML = ''; // Empty container initially

  // Add event listeners for the buttons
  addNewBtn.addEventListener('click', function() {
    container.innerHTML = `
      <div class="container">
        <h1 class="title">EISENHOWER TO DO LIST</h1>
        <input type="text" id="textbox" placeholder="Tasks for the day?">
        <div class="checkboxes">
          <label>
            <input type="radio" name="task-category" value="urg-important"> Urgent and Important
          </label>
          <label>
            <input type="radio" name="task-category" value="urg-not-important"> Urgent but Not Important
          </label>
          <label>
            <input type="radio" name="task-category" value="not-urg-important"> Not Urgent but Important
          </label>
          <label>
            <input type="radio" name="task-category" value="not-urg-not-important"> Neither Urgent nor Important
          </label>
        </div>
        <button type="button" id="btn"><span>Add Task</span></button>
        <hr class="line">
      </div>
    `;

    const taskInput = document.getElementById('textbox');
    const categoryRadios = document.querySelectorAll('input[name="task-category"]');

    // Add event listener for the "Add Task" button
    const addTaskBtn = document.getElementById('btn');
    addTaskBtn.addEventListener('click', function() {
      // Save the task and category
      const task = taskInput.value;
      let category = '';
      categoryRadios.forEach(radio => {
        if (radio.checked) {
          category = radio.value;
        }
      });

      // Add the task to the saved tasks array
      savedTasks.push({ task, category });

      // Clear the input field and uncheck radio buttons
      taskInput.value = '';
      categoryRadios.forEach(radio => {
        radio.checked = false;
      });
    });
  });

  urgentImportantBtn.addEventListener('click', function() {
    const filteredTasks = savedTasks.filter(task => task.category === 'urg-important');
    renderTasks(filteredTasks, 'Urgent and Important');
  });

  urgentNotImportantBtn.addEventListener('click', function() {
    const filteredTasks = savedTasks.filter(task => task.category === 'urg-not-important');
    renderTasks(filteredTasks, 'Urgent but Not Important');
  });

  notUrgentImportantBtn.addEventListener('click', function() {
    const filteredTasks = savedTasks.filter(task => task.category === 'not-urg-important');
    renderTasks(filteredTasks, 'Not Urgent but Important');
  });

  notUrgentNotImportantBtn.addEventListener('click', function() {
    const filteredTasks = savedTasks.filter(task => task.category === 'not-urg-not-important');
    renderTasks(filteredTasks, 'Neither Urgent nor Important');
  });

  // Function to render tasks in the container
  function renderTasks(tasks, title) {
    let taskListMarkup = '';
    if (tasks.length > 0) {
      taskListMarkup = `
        <ul class="taskList">
          ${tasks.map(task => `<li>
            <input type="checkbox" class="taskCheckbox">
            <span>${task.task}</span>
            </li>`).join('')}
        </ul>
      `;
    } else {
      taskListMarkup = '<p>No tasks added.</p>';
    }

    container.innerHTML = `
      <div class="container">
        <h1 class="title">${title}</h1>
        <hr class="line">
        <div class="taskContainer">
          ${taskListMarkup}
        </div>
      </div>
    `;
  }

});
