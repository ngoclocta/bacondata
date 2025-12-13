document.addEventListener('DOMContentLoaded', function() {
    var solutionsButton = document.getElementById('solutionsButton');
    var solutionsModal = new bootstrap.Modal(document.getElementById('solutionsModal'));

    if (solutionsButton) {
        solutionsButton.addEventListener('click', function() {
            solutionsModal.show();
        });
    }
});


