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
const modal = document.getElementById('formModal');
const closeModal = document.getElementById('modal-close');
const createTaskButton = document.getElementById('createTaskButton');

// Загружаем задачи из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editTaskId = null; // хранит id задачи, которую редактируем

// Отображаем задачи при загрузке
renderTasks();

// Открыть модалку
createTaskButton.addEventListener('click', () => {
    editTaskId = null; // создаем новую задачу
    taskInput.value = '';
    modal.style.display = 'flex';
});

// Закрыть модалку
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Добавление / редактирование задачи
addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text === '') return;

    if (editTaskId) {
        // Редактируем задачу
        tasks = tasks.map(task =>
            task.id === editTaskId ? { ...task, text } : task
        );
        editTaskId = null;
    } else {
        // Создаем новую задачу
        const task = {
            id: Date.now(),
            text: text,
            done: false
        };
        tasks.push(task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    modal.style.display = 'none';
    renderTasks();
});

// Функция для отображения всех задач
function renderTasks() {
    tasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        if (task.done) card.classList.add('done');

        const text = document.createElement('span');
        text.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.addEventListener('click', () => editTask(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        actions.append(checkbox, editBtn, deleteBtn);

        card.append( text, actions);

        if (task.done) {
            text.classList.add('done');
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

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}


function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    editTaskId = id;
    taskInput.value = task.text;

    $('#addButton').text( 'Edit');
    $('#modal-text').text( 'Edit Task');

    modal.style.display = 'flex';
}


