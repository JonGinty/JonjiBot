export function queryShorthand(selector, noWarn) {
    const els = document.querySelectorAll(selector);
    if (!noWarn && !els.length)
        console.warn(`no elements found matching selector: ${selector}`);
    return new DomQueryResult([...els]);
}
export class DomQueryResult {
    constructor(array) {
        this.a = array;
    }
    do(func) {
        this.a.forEach(el => func(el));
    }
}
