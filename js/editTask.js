function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    editTaskId = id;
    taskInput.value = task.text;

    $('#addButton').text('Edit');
    $('#modal-text').text('Edit Task');

    $('#formModal')
        .css('display', 'flex')
        .hide()
        .fadeIn(300);
}
