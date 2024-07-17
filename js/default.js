function typeTextIntoNode(queryString, text) {
    let i = 0, timeout = 50;
    const nodes = document.querySelectorAll(queryString);
    const fnTypingChar = char => setTimeout(() => {
        nodes.forEach(node => {
            if (node.querySelectorAll(queryString).length > 0)
                throw new DOMException('node안에 node존재');

            node.innerHTML += text.charAt(i);
        });
        if (i < text.length) fnTypingChar(text.charAt(i++));
    }, timeout);

    fnTypingChar(text);
}