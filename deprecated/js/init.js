const intervalAddr = {};
const intervalTimeout = 10;
const singleTagSet = new Set()
    .add('meta')
    .add('link')
    .add('br')
    .add('hr')
    .add('img')
    .add('input');

function getUrl(htmlName) {
    return location.origin + '/component/' + htmlName + '.html';
}

function fnWriteHtmlComponent(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = ev => {
        if (xhr.readyState === 4 && xhr.responseText) {
            if (callback !== undefined) callback(xhr.responseText)
        }
    }
    xhr.send();
}

function text(queryString, text, interval, callback) {
    if (text === '' || text === null || text === undefined) return;

    let i = 0;
    const nodes = typeof queryString === 'object' ? [queryString] : document.querySelectorAll(queryString);

    function isSingleTag(txt) {
        if (typeof txt !== 'string') return false;
        return singleTagSet.has(txt.toLowerCase());
    }

    function fnTypingChar(char, address) {
        return setTimeout(() => {
            if (text.charAt(i) === '<' && text.charAt(i + 1) !== '/') {
                const startTag = {};
                startTag.endIdx = text.indexOf('>', i);
                startTag.str = text.substring(i, startTag.endIdx + 1);
                startTag.splitIdx = text.substring(i, startTag.endIdx).indexOf(' ');

                if (startTag.splitIdx !== -1) {
                    startTag.name = startTag.str.substring(1, startTag.splitIdx);
                    startTag.info = startTag.str.substring(startTag.splitIdx, startTag.endIdx);

                } else {
                    startTag.name = startTag.str.substring(1, startTag.endIdx - i);
                }

                if (isSingleTag(startTag.name)) {
                    nodes.forEach(node => node.innerHTML += startTag.str);
                    i += startTag.str.length - 1;

                } else {
                    let endTagIdx = text.indexOf('</' + startTag.name, startTag.endIdx + 1);
                    let strContents = text.substring(i + startTag.str.length, endTagIdx);
                    while (strContents.match('<' + startTag.name)?.length !== strContents.match('</' + startTag.name)?.length) {
                        strContents = text.substring(i + startTag.str.length, endTagIdx);
                        endTagIdx += text.substring(endTagIdx + 1).indexOf('</' + startTag.name) + 1;
                    }

                    nodes.forEach(node => node.innerHTML += text.substring(i, endTagIdx));
                    i = endTagIdx + '</'.length + startTag.name.length;
                }

            } else {
                nodes.forEach(node => {
                    if (typeof queryString !== 'object' && node.querySelectorAll(queryString).length > 0)
                        throw new DOMException('node안에 node존재');

                    node.innerHTML += char;
                    clearInterval(address);
                    delete intervalAddr[address];
                });
            }

            i++;

            if (i < text.length) {
                let addr = Number(new Date());
                intervalAddr[addr] = fnTypingChar(text.charAt(i), addr);

            } else if (i === text.length && callback !== null && callback !== undefined) {
                callback();

            }


        }, interval === undefined || interval === null ? intervalTimeout : interval);
    }

    fnTypingChar(text.charAt(i), null);
}

const loading = {
    addr: null,
    idx: 0,
    headerLogo: document.getElementById('main-logo'),
    headerHTML: '<img src="/icon.png" alt="vigfoot" style="width: 5rem;">',
    char: ['/', '-', '\\', '|'],
    onLogo: () => {
        loading.addr = setInterval(() => {
            if (loading.idx >= loading.char.length) loading.idx = 0;

            loading.headerLogo.innerHTML = loading.char[loading.idx++];

        }, intervalTimeout);
    },
    clear: () => {
        clearInterval(loading.addr);
        loading.addr = null;
        loading.headerLogo.innerHTML = loading.headerHTML;
    }
}

function fnCopyToClipboard(node) {
    navigator.clipboard.writeText(node.innerHTML);
    alert('Copy Completed\n' + node.innerHTML);
}

loading.onLogo();

window.onload = () => {
    loading.clear();
}