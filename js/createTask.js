const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const tasksContainer = document.getElementById('tasksContainer');
const taskCount = document.getElementById('taskCount');
const doneCount = document.getElementById('doneCount');
const doneTasksContainer = document.getElementById('doneTasksContainer');
const modal = document.getElementById('formModal');
const closeModal = document.getElementById('modal-close');
const createTaskButton = document.getElementById('createTaskButton');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editTaskId = null;

renderTasks();

createTaskButton.addEventListener('click', () => {
    editTaskId = null;
    taskInput.value = '';
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

addButton.addEventListener('click', () => {
    $('#addButton').text('Add');
    $('#modal-text').text('Add Task');
    const text = taskInput.value.trim();
    if (text === '') return;

    if (editTaskId) {
        updateExistingTask(editTaskId, text);
    } else {
        const task = {
            id: Date.now(),
            text: text,
            done: false,
        };
        tasks.unshift(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    taskInput.value = '';
    modal.style.display = 'none';
});

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
        card.append(text, actions);

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
function updateExistingTask(id, newText) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.text = newText;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}