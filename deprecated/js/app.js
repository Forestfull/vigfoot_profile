text('#main-header > h1', 'Developer Vigfoot');
(() => {
    fnWriteHtmlComponent(getUrl('summary'), res => text(document.getElementById('summary'), res));
})();
