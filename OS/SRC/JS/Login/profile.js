console.log("Profiles loaded");

function updateHiddenCards(activeName) {
    $('.profile .switch .card').each(function () {
        const cardName = $(this).attr('data-profileName') || $c.find('h2').text();
        if (cardName === activeName) {
            $(this).addClass('skip');
        } else {
            $(this).removeClass('skip');
        }
    });
}

let profileSwapTimeout = null;
let profileCleanupTimeout = null;

function cssTimeToMs(timeStr) {
    const s = (timeStr || '').trim();
    if (!s) return 0;
    if (s.endsWith('ms')) return parseFloat(s);
    if (s.endsWith('s')) return parseFloat(s) * 1000;
    return parseFloat(s) || 0;
}

function getProfileSwitchTimings(el) {
    const fallback = { swapMs: 100, totalMs: 200 };
    if (!el || typeof getComputedStyle !== 'function') return fallback;

    const cs = getComputedStyle(el);
    const durations = (cs.animationDuration || '').split(',').map(cssTimeToMs);
    const delays = (cs.animationDelay || '').split(',').map(cssTimeToMs);

    let swapMs = 0;
    let totalMs = 0;
    for (let i = 0; i < durations.length; i++) {
        const dur = durations[i] || 0;
        if (!dur) continue;
        const delay = delays[i % delays.length] || 0;
        const total = delay + dur;
        const mid = delay + dur / 2;
        if (total > totalMs) totalMs = total;
        if (mid > swapMs) swapMs = mid;
    }

    if (!totalMs) return fallback;
    return { swapMs: swapMs, totalMs: totalMs };
}

function setProfile($card) {
    const name = $card.attr('data-profileName') || $card.find('h2').text();
    const description = $card.attr('data-profileDescription') || $card.find('h2').text();
    const picture = $card.find('img').attr('src');

    if (name === $('#profileName').text()) {
        $('.profile .switch').removeClass('active');
        return;
    }

    if (picture) {
        const pre = new Image();
        pre.src = picture;
    }

    const $animated = $('.password .profile .text');

    if (profileSwapTimeout) clearTimeout(profileSwapTimeout);
    if (profileCleanupTimeout) clearTimeout(profileCleanupTimeout);

    $animated.removeClass('profileSwitching');
    if ($animated[0]) void $animated[0].offsetWidth;
    $animated.addClass('profileSwitching');

    const timings = getProfileSwitchTimings($animated[0]);
    const swapMs = timings.swapMs;
    const totalMs = timings.totalMs;

    const onAnimEnd = function () {
        if (profileCleanupTimeout) clearTimeout(profileCleanupTimeout);
        $animated.off('animationend', onAnimEnd);
        $animated.removeClass('profileSwitching');
    };
    $animated.off('animationend', onAnimEnd);
    $animated.on('animationend', onAnimEnd);

    profileSwapTimeout = setTimeout(function () {
        if (name) {
            $('#profileName').text(name);
        }
        if (description) {
            $('#profileDescription').text(description);
        }
        if (picture) {
            $('#profilePicture').attr('src', picture);
        }

        updateHiddenCards(name);
    }, swapMs);

    profileCleanupTimeout = setTimeout(onAnimEnd, totalMs + 50);

    console.log("Switched profile to " + name);
}

$('.profile .switch').on('click', function () {
    $(this).toggleClass('active');
});

$('.profile .switch .card').on('click', function (e) {
    e.stopPropagation();
    setProfile($(this));
    $('.profile .switch').removeClass('active');
});

updateHiddenCards($('#profileName').text());