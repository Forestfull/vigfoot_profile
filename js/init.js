const intervalAddr = {};
const intervalTimeout = 50;
const singleTagList = ['br', 'hr', 'img', 'input'];

function text(queryString, text, interval, callback) {
    if (text === '' || text === null || text === undefined) return;

    let i = 0;
    const nodes = typeof queryString === 'object' ? [queryString] : document.querySelectorAll(queryString);
    const fnTypingChar = (char, address) => setTimeout(() => {
        nodes.forEach(node => {
            if (typeof queryString !== 'object' && node.querySelectorAll(queryString).length > 0)
                throw new DOMException('node안에 node존재');

            node.innerHTML += char;
            clearInterval(address);
            delete intervalAddr[address];
        });

        if (i < text.length) {
            let addr = Number(new Date());
            intervalAddr[addr] = fnTypingChar(text.charAt(i++), addr);
        } else if (i === text.length && callback !== null && callback !== undefined){
            callback();
        }

    }, interval === undefined || interval === null ? intervalTimeout : interval);

    fnTypingChar(text.charAt(i++));

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

loading.onLogo();

window.onload = () => {
    loading.clear();
}