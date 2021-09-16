
export function queryShorthand(selector: string, noWarn?: true): DomQueryResult {
    const els = document.querySelectorAll(selector);
    if (!noWarn && !els.length) console.warn(`no elements found matching selector: ${selector}`);
    return new DomQueryResult([...els] as HTMLElement[]);
}

export class DomQueryResult {
    public a: HTMLElement[];
    
    public do(func: ((el: HTMLElement) => void)): void {
        this.a.forEach(el => func(el));
    }

    public constructor (array: HTMLElement[]){
        this.a = array;
    }
}