let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.style.margin = "10px 0";

        li.innerHTML = `
            <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">
                ${task.text}
            </span>

            <button onclick="toggleTask(${index})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>

            <button onclick="deleteTask(${index})">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {

    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    saveTasks();

    input.value = "";

    renderTasks();
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    renderTasks();
}

function filterTasks(type) {

    renderTasks(type);
}

renderTasks();