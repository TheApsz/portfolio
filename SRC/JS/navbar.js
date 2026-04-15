$(function() {
    const $indicator = $('.navbarIndicatorText');
    const sections = $('[data-section]');
    let currentLabel = null;
    let queue = [];
    let isAnimating = false;

    function processQueue() {
        if (isAnimating || queue.length === 0) return;

        const next = queue.shift();
        if (next === currentLabel) {
            processQueue();
            return;
        }

        isAnimating = true;
        currentLabel = next;

        $indicator.addClass('changeout');
        setTimeout(() => {
            $indicator.text(next);
            $indicator.removeClass('changeout').addClass('changein');
            setTimeout(() => {
                $indicator.removeClass('changein');
                isAnimating = false;
                processQueue();
            }, 200);
        }, 200);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const label = $(entry.target).data('section');
                queue.push(label);
                processQueue();
            }
        });
    }, { threshold: 1 });

    sections.each(function() {
        observer.observe(this);
    });
});