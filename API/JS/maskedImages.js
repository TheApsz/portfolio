function updateMaskedImage(wrapper) {
    const image = wrapper.querySelector(':scope > img.pixel');
    if (!image || !image.currentSrc) return;

    wrapper.style.maskImage = `url("${image.currentSrc}")`;
    wrapper.style.webkitMaskImage = `url("${image.currentSrc}")`;
}

function updateMaskedImages(root = document) {
    root.querySelectorAll('.img').forEach((wrapper) => {
        const image = wrapper.querySelector(':scope > img.pixel');
        if (image && !image.complete) {
            image.addEventListener('load', () => updateMaskedImage(wrapper), { once: true });
        } else {
            updateMaskedImage(wrapper);
        }
    });
}

updateMaskedImages();

new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                updateMaskedImages(node);
            }
        });
    });
}).observe(document.documentElement, { childList: true, subtree: true });
