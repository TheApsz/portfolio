console.log("Login Password data has been parsed")
$(document).on('keydown', function (e) {
    if (e.key === 'Enter' && $('#login').hasClass('active')) {
        $('#login').removeClass('active');
    }
});