text('#main-header', 'Header');
text('.flex-component-icon > *', 'is section');
(() => {
    document.querySelectorAll('.nav-list > li > a')
        .forEach(node => {
            text(node, node.querySelector('img').getAttribute('alt'));
        });
})();