export function render (type, data) {
    if (type === "title") {
        return `${ "".padStart(data.level, "#") } ${ data.value }`;
    }
    else if (type === "paragraph") {
        return `${ data.value }`;
    }
};