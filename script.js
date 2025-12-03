document.addEventListener("DOMContentLoaded", () => {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    // -----------------------------
    // Load tasks from Local Storage
    // -----------------------------
    function loadTasks() {
        const storedTasks = localStorage.getItem("tasks");

        if (storedTasks) {
            tasks = JSON.parse(storedTasks);

            tasks.forEach(taskText => {
                createTaskElement(taskText);
            });
        }
    }

    // -----------------------------
    // Save tasks to Local Storage
    // -----------------------------
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // -----------------------------
    // Create a task <li> element
    // -----------------------------
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.addEventListener('click', () => {
            // Remove from DOM
            li.remove();

            // Remove from array
            tasks = tasks.filter(t => t !== taskText);

            // Update Local Storage
            saveTasks();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // -----------------------------
    // Add a new task
    // -----------------------------
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Enter a task");
            return;
        }

        // Add to DOM
        createTaskElement(taskText);

        // Add to array
        tasks.push(taskText);

        // Save updated tasks
        saveTasks();

        // Clear input
        taskInput.value = "";
    }

    // Button click
    addButton.addEventListener('click', addTask);

    // Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load existing tasks on page load
    loadTasks();

});
