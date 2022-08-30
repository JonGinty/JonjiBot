import  {getAllUrlParameters} from "./pathutils.js"
import { objectKeysToLowerCase } from "./typeutils.js";
import { isResultValid, isValid, IValidatable, worstValidationResult } from "./validation.js";

// not really sure if we need this tbh
export interface PageSpec {
    [key: string]: any;
}

// export class PageSpecBase implements PageSpec {

//     public build() {
//         return { ...this};
//     }
// }

export function GetPageParamsFromUrl(emptyParams: PageSpec): PageSpec {
    const outputParams = {...emptyParams};
    const allParams = objectKeysToLowerCase( getAllUrlParameters());

    for (const prop in outputParams) {
        const inputVal = outputParams[prop];
        const paramVal = allParams[prop.toLowerCase().replace(/-/g, "")]
        switch (typeof(inputVal)) {
            case "number":
                outputParams[prop] = Number(paramVal);
                break;
            case "undefined":
            case "string":
            default:
                outputParams[prop] = paramVal;
                break;
            // todo: more types?
        }
    }
    return outputParams;
}

export function LoadAndValidatePageParams(emptyParams: PageSpec): PageParameters<PageSpec> {
    const params = GetPageParamsFromUrl(emptyParams);
    if ((params as IValidatable).validate) {
        const validationResult = (params as IValidatable).validate();
        if (isValid(validationResult)) {
            delete params.validate;
        } else {
            throw new Error(worstValidationResult(validationResult)?.message);
        }
    }
    return {... params};
}

export function ensureValid(obj: IValidatable) {
    const result = obj.validate();
    if (isValid(result)) {
        // do nothing
    } else {
        throw new Error(worstValidationResult(result)?.message);
    }
}

type omitValidate<T> = Omit<T, "validate">;
type omitBuild<T> = Omit<T, "build">

export type PageParameters<T> = omitValidate<omitBuild<T>>;

const propertyMetadataKey = Symbol.for("design:propertyMetadata");

export function loadFromUrl(obj: any) {
    const metadata = getPropertyMetadata(obj);
    if (!metadata) return;
    const allParams = objectKeysToLowerCase( getAllUrlParameters());

    for (const key in metadata) {
        if (key in allParams) {
            obj[key] = allParams[key];
        }
    }
}

export function fromUrl(ops?: UrlParameterOptions) {
    if (!ops) ops = {};
    return function (target: any, propName: string) {
        console.log("stuff:", { ...ops, target, propName  });
        const metadata = getPropertyMetadata(target);
        metadata[propName] = ops as UrlParameterOptions;
    }
}

export function getPropertyMetadata(target: any): MetaDataCollection {
    let metadata = target[propertyMetadataKey] as MetaDataCollection;
    if (metadata) return metadata;
    metadata = {};
    target[propertyMetadataKey] = metadata;
    return metadata;
}

export type UrlParameterOptions = {
    type?: "text" | "integer" | "real" | "date";
}

export type MetaDataCollection = { [key:string]: UrlParameterOptions } 


