// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index=${index}>
                <span contenteditable="true" data-index=${index}>${task.text}</span>
                <button data-index=${index}>Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            updateLocalStorage();
            renderTasks();
        }
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
    };

    const editTask = (index, newText) => {
        tasks[index].text = newText;
        updateLocalStorage();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    };

    addTaskButton.addEventListener('click', addTask);

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            deleteTask(index);
        } else if (e.target.tagName === 'INPUT') {
            const index = e.target.dataset.index;
            toggleTaskCompletion(index);
        }
    });

    taskList.addEventListener('input', (e) => {
        if (e.target.tagName === 'SPAN') {
            const index = e.target.dataset.index;
            editTask(index, e.target.textContent);
        }
    });

    renderTasks();
});
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        updateLocalStorage();
        renderTasks();
    } else {
        alert('Task cannot be empty');
    }
};
