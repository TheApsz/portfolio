function secureLinks(root = document) {
    root.querySelectorAll('a[target="_blank"]').forEach((link) => {
        const values = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
        values.add('noopener');
        values.add('noreferrer');
        link.setAttribute('rel', [...values].join(' '));
    });
}

secureLinks();

new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                secureLinks(node);
            }
        });
    });
}).observe(document.documentElement, { childList: true, subtree: true });
