$(document).ready(function() {
    function updateClock() {
        const now = new Date();
        // const timeDate = now;

        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const timeDate = new Date(utc + (3600000 * 3));

        let hours = timeDate.getHours().toString().padStart(2, '0');
        let minutes = timeDate.getMinutes().toString().padStart(2, '0');

        $('#myTime').text(`${hours}:${minutes}`);
    }
    updateClock();

    setInterval(updateClock, 1000);
});