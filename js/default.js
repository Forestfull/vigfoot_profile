const mainPopup = document.getElementById('main-popup'),
    mainPopupBackground = document.getElementById('main-popup-background');

mainPopupBackground.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.id === mainPopup.id) return;

    mainPopup.innerHTML = '';
    e.target.classList.add('display-none');
});

function openPopup(url) {
    fnWriteHtmlComponent(mainPopup, url
        , () => mainPopupBackground.classList.remove('display-none'));

}