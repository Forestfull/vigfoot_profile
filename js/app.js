text('#main-header > h1', 'Developer Vigfoot');
(() => {
    document.querySelectorAll('#nav-list > li > a')
        .forEach(node => {
            text(node, node.querySelector('img').getAttribute('alt'));
        });

    fnWriteHtmlComponent(document.getElementById('summary'), getUrl('summary'));
})();