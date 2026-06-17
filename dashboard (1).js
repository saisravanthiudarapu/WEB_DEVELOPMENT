const apiKey = "20d1f0ef079d92240c42ca46de7e3eb9";

/* WEATHER */

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "Please enter a city";
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        result.innerHTML = "Loading...";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        result.innerHTML = `
            <h3>${data.name}</h3>

            <p>Temperature: ${data.main.temp} °C</p>

            <p>Humidity: ${data.main.humidity}%</p>

            <p>Wind Speed: ${data.wind.speed} m/s</p>

            <p>Weather: ${data.weather[0].description}</p>
        `;

    } catch (error) {

        result.innerHTML = error.message;
    }
}

/* TODO APP */

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