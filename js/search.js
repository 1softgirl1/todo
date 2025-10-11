const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

if (searchButton) {
    searchButton.addEventListener('click', searchTasks);
}

if (searchInput) {
    searchInput.addEventListener('input', searchTasks);
}

function searchTasks() {
    const query = searchInput.value.toLowerCase().trim();

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(query)
    );

    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filtered) {
    tasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';

    filtered.forEach(task => {
        const card = document.createElement('div');
        card.className = 'task-card';
        if (task.done) card.classList.add('done');

        const text = document.createElement('span');
        text.textContent = task.text;
        if (task.done) text.classList.add('done');

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
            doneTasksContainer.appendChild(card);
        } else {
            tasksContainer.appendChild(card);
        }
    });

    taskCount.textContent = filtered.filter(t => !t.done).length;
    doneCount.textContent = filtered.filter(t => t.done).length;
}
