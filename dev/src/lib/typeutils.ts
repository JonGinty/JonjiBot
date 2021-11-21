export type Bind<T> = {
    [prop in keyof T]: T[prop];
}


export function objectKeysToLowerCase(input: {[key: string]: any}) {
    const output: {[key: string]: any} = {};
    for (const prop in input) {
        output[prop.toLowerCase()] = input[prop];
    }

    return output;
}