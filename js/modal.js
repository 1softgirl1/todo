
$('#createTaskButton').click(function() {
    $('#formModal')
        .css('display', 'flex')
        .hide()
        .fadeIn(300);

});

$('#modal-close').click(function() {
    $('#formModal').fadeOut(300);
});

$(document).keydown(function(e) {
    if (e.key === "Escape") {
        $('.modal').fadeOut(300);
    }
});

$('#addButton').click(function() {
    $('#formModal').fadeOut(300);
});

$('#addButton').text( 'Add');

