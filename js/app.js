text('#main-header > h1', 'Developer Vigfoot');
(() => {
    document.querySelectorAll('.nav-list > li > a')
        .forEach(node => {
            text(node, node.querySelector('img').getAttribute('alt'));
        });
    document.querySelectorAll('#main-section > article > fieldset > legend')
        .forEach(node => {
            text(node, node.dataset.comp, null, () => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', location.origin + '/vigfoot_profile' + '/fieldset/' + node.parentNode.parentNode.id + '.html');
                xhr.onreadystatechange = ev => {
                    if (xhr.readyState === 4 && xhr.responseText)
                        text(node.parentNode, xhr.responseText, 1);
                }
                xhr.send();
            });
        });
})();