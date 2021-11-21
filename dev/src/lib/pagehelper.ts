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

type omitValidate<T> = Omit<T, "validate">;
type omitBuild<T> = Omit<T, "build">

export type PageParameters<T> = omitValidate<omitBuild<T>>;