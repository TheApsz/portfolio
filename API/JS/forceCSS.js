function timestampString() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    
    return (
        now.getFullYear() +
        pad(now.getMonth() + 1) +
        pad(now.getDate()) +
        pad(now.getHours()) +
        pad(now.getMinutes()) +
        pad(now.getSeconds())
    );
}

document.querySelectorAll('link[rel="stylesheet"]').forEach(function(link) {
    const url = new URL(link.href);
    url.searchParams.set("v", timestampString());
    link.href = url.toString();
});