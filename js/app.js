text('#main-header > h1', 'Developer Vigfoot');
(() => {
    document.querySelectorAll('.nav-list > li > a')
        .forEach(node => {
            text(node, node.querySelector('img').getAttribute('alt'));
        });

    function fnWriteHtmlComponent(node, componentId) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', getUrl(componentId));
        xhr.onreadystatechange = ev => {
            if (xhr.readyState === 4 && xhr.responseText)
                text(node, xhr.responseText, 1);
        }
        xhr.send();
    }

    function getUrl(htmlName) {
        return location.origin + '/vigfoot_profile/component/' + htmlName + '.html';
    }

    fnWriteHtmlComponent(document.querySelector('#summary-comp'), 'summary-comp');

    document.querySelectorAll('#main-section > article > fieldset > legend')
        .forEach(node => text(node, node.dataset.comp, null, () => fnWriteHtmlComponent(node.parentNode, node.parentNode.parentNode.id)));
})();