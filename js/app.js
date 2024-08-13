text('#main-header > h1', 'Developer Vigfoot');
(() => {
    document.querySelectorAll('#nav-list > li > a')
        .forEach(node => {
            node.innerHTML += '<p>' + node.querySelector('img').getAttribute('alt') + '</p>';
        });

    fnWriteHtmlComponent(getUrl('summary'), res => text(document.getElementById('summary'), res));
})();