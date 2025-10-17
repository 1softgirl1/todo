document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('themeToggle');
    const html = document.documentElement;

    btn.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });
});