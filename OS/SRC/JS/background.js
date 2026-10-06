console.log("Loaded background");
function syncZoomStates() {
    // if #login has .active, add zoom to #background instead
    const $login = $('#login');
    const $background = $('#background img');
    
    if ($login.hasClass('active')) {
        $background.addClass('zoom');
    } else {
        $background.removeClass('zoom');
    }

    $('.application').each(function () {
        const $app = $(this);
        if ($app.hasClass('max')) {
            $background.addClass('zoom');
        } else {
            $background.removeClass('zoom');
        }
    });
}

setInterval(syncZoomStates, 100);