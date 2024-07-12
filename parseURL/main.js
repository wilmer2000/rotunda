import {UrlParser} from './classes/url-parse.class.js';
const inputURL = document.getElementById('input-url');
const inputFormat = document.getElementById('input-format');
const jsonViewer = document.getElementById('json-viewer');
const urlList = document.getElementById('url-list');
const parseButton = document.getElementById('parse-url-button');
const urlParser = new UrlParser();

function setJSONViewer(urlParsed) {
    jsonViewer.textContent = JSON.stringify(urlParsed, null, 2);
}

function setListViewer(urlParsed) {
    urlList.innerHTML = Object.keys(urlParsed).map((k) => {
        return `<li>
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <b class="d-block">${k}</b>
                        </div>
                        <div class="flex-grow-1"></div>
                        
                        <span class="list-block">${urlParsed[k]}</span>
                    </div>
                </li>`
    }).join('');
}

function setEventListeners() {
    inputURL.addEventListener('keyup', (event) => {
        urlParser.urlToParse = event.target.value ?? '';
    });
    inputFormat.addEventListener('keyup', (event) => {
        urlParser.formatToUse = event.target.value;
    });
    parseButton.addEventListener('click', () => {
        const urlParsed = urlParser.parse();
        if (urlParsed) {
            setJSONViewer(urlParsed);
            setListViewer(urlParsed);
        }
    });
}

function main() {
    setEventListeners();
}

main();
