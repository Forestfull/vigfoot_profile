text('#main-header > h1', 'Header');
text('.flex-component-icon > *', 'is section');
(() => {
    document.querySelectorAll('.nav-list > li > a')
        .forEach(node => {
            text(node, node.querySelector('img').getAttribute('alt'));
        });
})();