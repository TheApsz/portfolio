console.log("Login screen clock has been created")
function updateClock() {
    const now = new Date();

    // Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);

    $('#login .hour').text(hours);
    $('#login .minute').text(minutes);
    $('#login .second').text(seconds);
    $('#login .microsecond').text('.' + ms);

    // Date
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const year = now.getFullYear();
    const day = String(now.getDate()).padStart(2, '0');

    $('#login .year').text(year);
    $('#login .day').text(day);

    // Month — check if it's flagged as "number" style
    const $month = $('#login .month');
    if ($month.hasClass('number')) {
        $month.text(String(now.getMonth() + 1).padStart(2, '0'));
    } else {
        $month.text(monthNames[now.getMonth()]);
    }
}

updateClock();
setInterval(updateClock, 16);