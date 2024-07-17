const intervalAddr = {};

function typeTextIntoNode(queryString, text) {
    let i = 0, timeout = 50;
    const nodes = document.querySelectorAll(queryString);
    const fnTypingChar = (char, address) => setTimeout(() => {
        nodes.forEach(node => {
            if (node.querySelectorAll(queryString).length > 0)
                throw new DOMException('node안에 node존재');

            node.innerHTML += char;
            clearInterval(address);
            delete intervalAddr[address];
        });

        if (i < text.length) {
            let addr = Number(new Date());
            intervalAddr[addr] = fnTypingChar(text.charAt(i++), addr);
        }
    }, timeout);

    fnTypingChar(text.charAt(i++));
}