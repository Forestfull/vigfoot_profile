const mainPopup = document.getElementById('main-popup'),
    mainPopupContents = mainPopup.querySelector('fieldset'),
    mainPopupBackground = document.getElementById('main-popup-background');

function openPopup(url) {
    fnWriteHtmlComponent(url, res => {
        text(mainPopupContents, res, 1)
        mainPopupBackground.classList.remove('display-none')
    });
}

mainPopupBackground.addEventListener('click', e => {
    if (e.target.id !== mainPopupBackground.id) return;

    mainPopupContents.innerHTML = '<legend></legend>';
    e.target.classList.add('display-none');
});

document.querySelectorAll('#nav-list > li > a')
    .forEach(node => {
        node.addEventListener('click', e => {
            const urlName = node.querySelector('img').getAttribute('alt');
            mainPopupContents.querySelector('legend').innerHTML = urlName;
            mainPopupBackground.classList.remove('display-none');
            fnWriteHtmlComponent(getUrl(urlName)?.toLowerCase(), res => text(mainPopupContents, res, 1));
        });
    });

fnWriteHtmlComponent('/project/config.json'
    , res => {
        text(document.getElementById('icon-wrap'), res)
    });