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
    // Временно сохраняем оригинальные задачи
    const originalTasks = tasks;

    // Временно заменяем tasks отфильтрованными
    tasks = filtered;

    // Используем существующую renderTasks
    renderTasks();

    // Восстанавливаем оригинальные задачи
    tasks = originalTasks;

    // Обновляем счетчики для отфильтрованных задач
    taskCount.textContent = filtered.filter(t => !t.done).length;
    doneCount.textContent = filtered.filter(t => t.done).length;
}
