const inputURL = document.getElementById('input-url');
const inputFormat = document.getElementById('input-format');
const jsonViewer = document.getElementById('json-viewer');
const urlList = document.getElementById('url-list');
const parseButton = document.getElementById('parse-url-button');

let formatToUse;
let urlToParse;
let urlParsed;

function getParamsObj(paramsString) {
    const paramsList = {};
    if (paramsString) {
        paramsString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            paramsList[key] = convertValue(value);
        });
    }
    return paramsList;
}

function getPathObj(formatParts, pathParts) {
    const result = {};
    formatParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const key = part.slice(1);
            result[key] = convertValue(pathParts[index]);
        }
    });
    return result;
}

function convertValue(value) {
    return isNaN(value) ? value : Number(value);
}

function parseUrl(url, format) {
    const [path, paramsString] = url.split('?');

    const formatParts = format.split('/');
    const pathParts = path.split('/');

    const pathResult = getPathObj(formatParts, pathParts);
    const paramsResult = getParamsObj(paramsString);

    return Object.assign(pathResult, paramsResult);
}

function setEventListeners() {
    inputURL.addEventListener('keyup', (event) => {
        urlToParse = event.target.value ?? '';
    });
    inputFormat.addEventListener('keyup', (event) => {
        formatToUse = event.target.value ?? '/:version/api/:collection/:id';
    });
    parseButton.addEventListener('click', (event) => {
        if (urlToParse && formatToUse) {
            urlParsed = parseUrl(urlToParse, formatToUse);
            jsonViewer.textContent = JSON.stringify(urlParsed, null, 2);
        }
    });
}

function main() {
    setEventListeners();
}

main();
