text('#main-header > h1', 'Developer Vigfoot');
(() => {
    document.querySelectorAll('.nav-list > li > a')
        .forEach(node => {
            text(node, node.querySelector('img').getAttribute('alt'));
        });
    document.querySelectorAll('#main-section > article > fieldset > legend')
        .forEach(node => {
            text(node, node.dataset.comp);
        });
})();