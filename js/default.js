const mainPopup = document.getElementById('main-popup'),
    mainPopupContents = mainPopup.querySelector('fieldset'),
    mainPopupBackground = document.getElementsByClassName('main-popup-background'),
    mainPopupHelp = document.getElementsByClassName('main-popup-help');

function openPopup() {
    for (let background of mainPopupBackground) background.classList.remove('display-none');
}

function closePopup() {
    for (let background of mainPopupBackground) background.classList.add('display-none');
}

console.log(mainPopupBackground);
for (let background of mainPopupBackground) {
    background.addEventListener('click', e => {
        if (!e.target.classList.contains('main-popup-background')) return;
        window.history.back();
    });
}

for (let helpMsg of mainPopupHelp) {
    helpMsg.addEventListener('click', e => {
        window.history.back();
    });
}

document.querySelectorAll('#nav-list > li > a')
    .forEach(node => {
        let title = node.querySelector('img').getAttribute('alt');
        node.innerHTML += '<p>' + title + '</p>';

        if (title !== 'Share') {
            node.addEventListener('click', e => {
                const urlName = node.querySelector('img').getAttribute('alt');
                const title = node.querySelector('p').innerText;
                window.history.pushState(null, null, './' + title);
                mainPopupContents.querySelector('legend').innerHTML = urlName;
                openPopup();

                fnWriteHtmlComponent(getUrl(urlName)?.toLowerCase(), res => text(mainPopupContents, res, 1));
            });
        }
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
                    openPopup();
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
    for (let background of mainPopupBackground)
        closePopup();
}

window.addEventListener('keyup', e => {
    if (e.key === 'Escape' || e.key === 'Backspace') {
        mainPopupContents.innerHTML = '<legend></legend>';
        closePopup();
    }
});