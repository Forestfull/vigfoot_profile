const mainPopup = document.getElementById('main-popup'),
    mainPopupBackground = document.getElementById('main-popup-background');

mainPopupBackground.addEventListener('click', e => {
    if (e.target.id !== mainPopupBackground.id) return;

    mainPopup.innerHTML = '';
    e.target.classList.add('display-none');
});

function openPopup(url) {
    fnWriteHtmlComponent(mainPopup, url
        , () => mainPopupBackground.classList.remove('display-none'));

}