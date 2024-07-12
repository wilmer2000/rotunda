export class UrlParser {
    constructor() {
        this.formatToUse = null;
        this.urlToParse = null;
        this.urlParsed = null;
    }

    validateValue(value) {
        return isNaN(value) ? value : Number(value);
    }

    getParamsObj(paramsString) {
        const paramsList = {};
        if (paramsString) {
            paramsString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                paramsList[key] = this.validateValue(value);
            });
        }
        return paramsList;
    }

    getPathObj(formatParts, pathParts) {
        const result = {};
        formatParts.forEach((part, index) => {
            if (part.startsWith(':')) {
                const key = part.slice(1);
                result[key] = this.validateValue(pathParts[index]);
            }
        });
        return result;
    }

    parseUrl(url, format) {
        const [path, paramsString] = url.split('?');
        const formatParts = format.split('/');
        const pathParts = path.split('/');
        const pathResult = this.getPathObj(formatParts, pathParts);
        const paramsResult = this.getParamsObj(paramsString);
        return Object.assign(pathResult, paramsResult);
    }

    parse() {
        if (this.urlToParse && this.formatToUse) {
            this.urlParsed = this.parseUrl(this.urlToParse, this.formatToUse);
            return this.urlParsed;
        }
    }
}
