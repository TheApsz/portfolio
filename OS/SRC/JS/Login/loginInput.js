let currentLength = 0; // tracks how many char-spans currently exist

$('.passwordInput').on('input', function () {
    const value = $(this).val();
    const $display = $(this).siblings('h3');

    if (value.length === 0) {
        // fully empty — reset to placeholder
        $display.empty().addClass('placeholder').text('Password...');
        currentLength = 0;
        return;
    }

    // first real character typed — clear placeholder ONCE
    if (currentLength === 0) {
        $display.empty().removeClass('placeholder');
    }

    if (value.length > currentLength) {
        // user typed a new character — append just the newest one
        const newChar = value[value.length - 1];
        const $charSpan = $('<span>').text(newChar);
        $display.append($charSpan);
    } else if (value.length < currentLength) {
        // user hit backspace — remove just the last span
        $display.children().last().remove();
    }

    currentLength = value.length;
});