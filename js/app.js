text('#main-header > h1', 'Developer Vigfoot');
(() => {
    document.querySelectorAll('#nav-list > li > a')
        .forEach(node => {
            let title = node.querySelector('img').getAttribute('alt');
            node.innerHTML += '<p>' + title + '</p>';

            if (title === 'more') {
                return;

            } else {
                node.addEventListener('click', e => {
                    const urlName = node.querySelector('img').getAttribute('alt');
                    const title = node.querySelector('p').innerText;
                    window.history.pushState(null, null, './' + title);
                    mainPopupContents.querySelector('legend').innerHTML = urlName;
                    mainPopupBackground.classList.remove('display-none');
                    fnWriteHtmlComponent(getUrl(urlName)?.toLowerCase(), res => text(mainPopupContents, res, 1));
                });
            }
        });

    fnWriteHtmlComponent(getUrl('summary'), res => text(document.getElementById('summary'), res));
})();
