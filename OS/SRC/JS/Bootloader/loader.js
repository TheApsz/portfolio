console.log("Bootloader loaded");

// --- Queue system ---
const cardQueue = [];
let isProcessingQueue = false;

function queueCard(type, message) {
    cardQueue.push({ type, message });
    processQueue();
}

function processQueue() {
    if (isProcessingQueue) return; // already chewing through it, don't start a second loop
    isProcessingQueue = true;

    function next() {
        if (cardQueue.length === 0) {
            isProcessingQueue = false;
            return;
        }

        const { type, message } = cardQueue.shift();
        appendCard(type, message);

        const delay = Math.random() * (70 - 20) + 20; // random between 20-70ms
        setTimeout(next, delay);
    }

    next();
}

function appendCard(type, message) {
    let indicatorClass, indicatorText;

    switch (type) {
        case 'success':
            indicatorClass = 'success';
            indicatorText = 'OK';
            break;
        case 'fail':
            indicatorClass = 'fail';
            indicatorText = 'FAIL';
            break;
        case 'warning':
            indicatorClass = 'warning';
            indicatorText = 'WARN';
            break;
    }

    const card = $(`
        <div class="card">
            <div class="indicator ${indicatorClass}">${indicatorText}</div>
            <h2>${message}</h2>
        </div>
    `);
    $('#bootloader').append(card);
}

// --- Public-facing functions, now queue instead of append directly ---
function logSuccessCard(message) {
    queueCard('success', message);
}

function logFailCard(message) {
    queueCard('fail', message);
}

function logWarnCard(message) {
    queueCard('warning', message);
}

// --- Console override, unchanged ---
function initConsoleLogger() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = function (...args) {
        originalLog.apply(console, args);
        logSuccessCard(args.join(' '));
    };

    console.warn = function (...args) {
        originalWarn.apply(console, args);
        logWarnCard(args.join(' '));
    };

    console.error = function (...args) {
        originalError.apply(console, args);
        logFailCard(args.join(' '));
    };
}
initConsoleLogger();

setTimeout(() => {
    console.log("Removing Boot menu...");

    setTimeout(() => {
        $('#bootloader').remove();
    }, 500);
}, 5000);