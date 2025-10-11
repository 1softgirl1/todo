// Ночной режим
document.querySelector('[data-switch-dark]').addEventListener('click', function() {
    document.body.classList.toggle('dark');
});

// Получаем элементы
const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const tasksContainer = document.getElementById('tasksContainer');
const taskCount = document.getElementById('taskCount');
const doneCount = document.getElementById('doneCount');
const doneTasksContainer = document.getElementById('doneTasksContainer');

// Загружаем задачи из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Отображаем задачи при загрузке
renderTasks();

// Добавление задачи
addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text === '') return;

    const task = {
        id: Date.now(),
        text: text,
        done: false
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    renderTasks();
});

// Функция для отображения всех задач
function renderTasks() {
    tasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';

        const text = document.createElement('span');
        text.textContent = task.text;
        if (task.done) text.classList.add('done');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        card.append(checkbox, text, deleteBtn);
        tasksContainer.appendChild(card);
        // Разделяем задачи по статусу
        if (task.done) {
            doneTasksContainer.appendChild(card);
        } else {
            tasksContainer.appendChild(card);
        }
    });

    taskCount.textContent = tasks.filter(t => !t.done).length;
    doneCount.textContent = tasks.filter(t => t.done).length;
}

// Переключение статуса задачи
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) task.done = !task.done;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Удаление задачи
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
