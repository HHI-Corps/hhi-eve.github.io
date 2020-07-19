
const code = "body{margin:0;font-family:Arial, Helvetica, sans-serif}.app.svelte-cbn714{text-align:left}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);