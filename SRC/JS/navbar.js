$(function() {
    const $indicator = $('.navbarIndicatorText');
    const $sections = $('[data-section]');
    let currentLabel = $indicator.text().trim();
    let isAnimating = false;

    function updateSection() {
        if (window.scrollY <= 50) {
            if (currentLabel !== '001 / HERO' && !isAnimating) {
                triggerAnimation('001 / HERO');
            }
            return;
        }

        const viewportCenter = window.innerHeight / 2;
        let foundLabel = null;
        $sections.each(function() {
            const rect = this.getBoundingClientRect();
            
            if (viewportCenter >= rect.top && viewportCenter <= rect.bottom) {
                foundLabel = $(this).data('section');
                return false;
            }
        });
        if (foundLabel && foundLabel !== currentLabel && !isAnimating) {
            triggerAnimation(foundLabel);
        }
    }

    function triggerAnimation(next) {
        console.log("Switching to:", next);
        isAnimating = true;
        currentLabel = next;
        $indicator.addClass('changeout');
        setTimeout(() => {
            $indicator.text(next);
            $indicator.removeClass('changeout').addClass('changein');
            setTimeout(() => {
                $indicator.removeClass('changein');
                isAnimating = false;
                
                updateSection();
            }, 200);
        }, 200);
    }

    window.addEventListener('scroll', updateSection, { passive: true });
    updateSection();
});