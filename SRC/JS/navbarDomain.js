$(function() {
    const hostname = window.location.hostname;
    const $domain = $('.navbarDomain');

    if (hostname === '127.0.0.1') {
        $domain.text('127.0.0.1');
    } else if (hostname === 'bleedingedge.apsz.pages.dev') {
        $domain.html('<span>bleedingedge.</span>apsz.pages.dev');
    } else if (hostname === 'apsz.pages.dev') {
        $domain.html('apsz.pages.dev');
    } else if (hostname === 'apsz.dev') {
        $domain.html('apsz.dev');
    }
});
