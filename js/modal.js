const createTaskButton = document.querySelector('.createTaskButton');

$('#createTaskButton').click(function() {
    $('#formModal')
        .css('display', 'flex')  // показываем как flex-контейнер
        .hide()                  // сразу скрываем (чтобы fadeIn работал)
        .fadeIn(300);            // плавно показываем

});

$('#modal-close').click(function() {
    $('#formModal').fadeOut(300); // скрыть окно
});

// Закрытие модального окна по ESC
$(document).keydown(function(e) {
    if (e.key === "Escape") {
        $('.modal').fadeOut(300);
    }
});

$('#addButton').click(function() {
    $('#formModal').fadeOut(300); // скрыть окно
});
