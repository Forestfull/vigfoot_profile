document.getElementById('main-popup-background').addEventListener('click', e => {
    e.preventDefault();
    if (e.target.id === 'main-popup') return;

    e.target.classList.add('display-none');
});