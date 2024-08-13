const mainPopup = document.getElementById('main-popup'),
    mainPopupContents = mainPopup.querySelector('fieldset'),
    mainPopupBackground = document.getElementById('main-popup-background');

mainPopupBackground.addEventListener('click', e => {
    if (e.target.id !== mainPopupBackground.id) return;
    window.history.back();
});

document.querySelectorAll('#nav-list > li > a')
    .forEach(node => {
        node.addEventListener('click', e => {
            const urlName = node.querySelector('img').getAttribute('alt');
            const title = node.querySelector('p').innerText;
            window.history.pushState(null, null, './' + title);
            mainPopupContents.querySelector('legend').innerHTML = urlName;
            mainPopupBackground.classList.remove('display-none');
            fnWriteHtmlComponent(getUrl(urlName)?.toLowerCase(), res => text(mainPopupContents, res, 1));
        });
    });

fnWriteHtmlComponent('/project/config.json'
    , res => {
        let dataList = JSON.parse(res)?.data;

        dataList.forEach(node => {
            const iconContainer = document.createElement('div');
            const iconImg = document.createElement("img");
            const iconTitle = document.createElement('p');
            iconContainer.appendChild(iconImg);
            iconContainer.appendChild(iconTitle);
            iconImg.setAttribute('src', node.icon);

            iconTitle.innerText = node.name;
            iconContainer.addEventListener('click', e => {
                fnWriteHtmlComponent(node.index, html => {
                    mainPopupContents.querySelector('legend').innerHTML = node.name;
                    mainPopupBackground.classList.remove('display-none');
                    text(mainPopupContents, html, 1);
                    window.history.pushState(null, null, './' + node.name);
                });
            });
            iconContainer.style.textAlign = 'center';
            iconContainer.style.cursor = 'pointer';
            iconImg.style.width = '50px';
            iconImg.style.height = '50px';
            document.getElementById('icon-wrap').appendChild(iconContainer);
        });
    });

window.onpopstate = e => {
    mainPopupContents.innerHTML = '<legend></legend>';
    mainPopupBackground.classList.add('display-none');
}