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
        card.className = `
          flex justify-between items-start gap-4 
          px-5 py-3 
          w-full max-w-[500px] 
          rounded-2xl mb-4 
          bg-color-background
        `;

        const text = document.createElement('span');
        text.textContent = task.text;
        text.className = 'text-accent break-words whitespace-normal flex-1';
        if (task.done) text.classList.add('line-through', 'text-color-success');

        const actions = document.createElement('div');
        actions.className = 'flex gap-2 items-center flex-shrink-0';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.className = `
          appearance-none w-4 h-4 rounded cursor-pointer 
          bg-center bg-no-repeat 
          bg-[url('/src/check.svg')] 
          checked:opacity-70 transition
        `;
        checkbox.addEventListener('change', () => toggleTask(task.id));

        const editBtn = document.createElement('button');
        editBtn.className = `
          border-none bg-transparent bg-no-repeat bg-center bg-cover 
          bg-[url('/src/edit.png')] w-4 h-4 cursor-pointer
        `;
        editBtn.addEventListener('click', () => editTask(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✕';
        deleteBtn.className = 'delete-btn border-none text-xl cursor-pointer transition-colors duration-200';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        actions.append(checkbox, editBtn, deleteBtn);
        card.append(text, actions);

        if (task.done) {
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