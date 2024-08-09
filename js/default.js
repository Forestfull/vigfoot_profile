const mainPopup = document.getElementById('main-popup'),
    mainPopupContents = mainPopup.querySelector('fieldset'),
    mainPopupBackground = document.getElementById('main-popup-background');

function openPopup(url) {
    fnWriteHtmlComponent(mainPopupContents, url
        , () => mainPopupBackground.classList.remove('display-none'));
}

mainPopupBackground.addEventListener('click', e => {
    if (e.target.id !== mainPopupBackground.id) return;

    mainPopupContents.innerHTML = '';
    e.target.classList.add('display-none');
});

document.querySelectorAll('#nav-list > li > a')
    .forEach(node => {
        node.addEventListener('click', e => {
            const urlName = node.querySelector('img').getAttribute('alt');
            mainPopupBackground.classList.remove('display-none');
            fnWriteHtmlComponent(mainPopupContents, getUrl(urlName)?.toLowerCase())
        });
    });