// PAGESPEC
// For information on PAGESPEC - see the pagespec doc
// which I will probably write at some point.

import { fromUrl, PageSpec } from "../lib/pagehelper.js";
import { IValidatable, ValidationResult, ValidationStatus } from "../lib/validation.js";

/**
 * This is probably where the doc level comments
 * would go for the page spec files and stuff.
 */
class ClocksPageSpec {
    
}

/**
 * 
 */
export class ClocksPageParameters implements PageSpec, IValidatable {
    
    /**
     * Polling interval for clocks to re-render in milliseconds.
     * @default 250 
     * [optional]
     */
    interval: number = 250;

    /**
     * The date / time format to output. 
     */
    @fromUrl()
    format?: string = undefined;

    @fromUrl()
    input?: string = undefined;

    //@fromUrl
    @fromUrl({type: "integer"})
    inputFormat?: string = undefined;

    @fromUrl({type: "integer"})
    inputDuration?: number = NaN;

    @fromUrl()
    inputDurationUnit?: string = undefined;

    @fromUrl()
    foo: string = "one";

    @fromUrl()
    bar: string = "two";

    @fromUrl()
    mode?: clockMode = undefined;

    validate(): ValidationResult[] {
        const result: ValidationResult[] = [];

        if (!this.mode) {
            result.push({status: ValidationStatus.Critical, message: "No clock mode specified."} );
        } else if (!(this.mode in clockMode)) {
            result.push({status: ValidationStatus.Critical, message: `${this.mode} is not a valid clock mode.`} );
        }

        if (this.mode === "countdown") {
            if (!this.input) {
                result.push({status: ValidationStatus.Critical, message: `Can't countdown, no "countdown to" time specified in "input" parameter.`} );
            }

            if (!this.inputFormat){
                result.push({status: ValidationStatus.Critical, message: `blah`} );
            }
        }

        return result;
    }
}

export enum clockMode {
    clock = "clock",
    countdown = "countdown",
    countup = "countup"
}







// class MyParams {
//     foo: ParamDescription = {
//         type: "string",
//         helpText: "foo, bar",
//         examples: "a b c",
//         defaultValue: ""
//     }
//     bar: ParamDescription = {
//         type: "decimal",
//         helpText: "foo, bar",
//         examples: "a b c",
//         defaultValue: 2
//     }
// }

// // interface ParamDescription<T> {
// //     defaultValue?: T;
// //     validation?: (foo: T) => boolean; // meh
// //     helpText: string;
// //     examples: string;
// // }


// type ParamDescriptionCommonFields = {
//     helpText: string;
//     examples: string;
// }

// type NumberParamDescription = {
//     type: "number" | "int" | "decimal";
//     defaultValue: number;
// }

// type StringParamDescription = {
//     type: "string";
//     defaultValue: string;
// }

// type ParamDescriptionConditional<T> 
//     = T extends NumberParamDescription ? number 
//     : T extends StringParamDescription ? string
//     : never;

// type ParamDescription = ParamDescriptionCommonFields & (NumberParamDescription | StringParamDescription)

// type ParamLiteral<T> = {
//     [prop in keyof T]: ParamDescriptionConditional<T[prop]>;
// }

// type some = ParamLiteral<MyParams>;

// type other = ParamDescriptionConditional<NumberParamDescription>

// // class MyParams {
// //     foo = StringParam({
// //         helpText: "some",
// //         examples: "some ex",
// //         defaultValue: "a string"
// //     });
// //     bar = IntParam({
// //         helpText: "hoo",
// //         examples: "durr",
// //         defaultValue: 2
// //     });
// //     car = "";
// // }

// // type ParamDescriptionConditional<T> 
// //     = T extends IntParamDescription ? number 
// //     : T extends StringParamDescription ? string
// //     : T;

// // type ParamFilter<T> = T extends ParamDescription ? T : never;

// // type ParamLiteral<T> = {
// //     [prop in keyof T]: ParamDescriptionConditional<T[prop]>;
// // }

// // type some = ParamLiteral<MyParams>;
// // type a = ParamFilter<IntParamDescription>;

// // interface ParamDescription {
// //     helpText: string;
// //     examples: string;
// //     type: string;
// // }

// // interface ParamDescriptionWithDefault<T> extends ParamDescription {
// //     defaultValue: T;
// // }

// // type withoutType<T> = {
// //     [prop in keyof T as Exclude<prop, "type">]: T[prop];
// // }



// // // type IntParamDescription = withoutType<ParamDescription<number>> | {type: "int"};
// // interface IntParamDescription extends ParamDescriptionWithDefault<number> {
// //     type: "int"
// // }

// // function IntParam(input: withoutType<IntParamDescription>): IntParamDescription {return {...input, ...{type: "int"}}};

// // interface StringParamDescription extends ParamDescriptionWithDefault<string> {
// //     type: "string"
// // }
// // function StringParam(input: withoutType<StringParamDescription>): StringParamDescription {return {...input, ...{type: "string"}}};


// // // type ParamDescription = 
// // // {
// // //     helpText: string;
// // //     examples: string;
// // // } 
// // // &(
// // //     {
// // //         type: "number" | "int" | "decimal",
// // //         defaultValue: number
// // //     }
// // //     |
// // //     {
// // //         type: "string",
// // //         defaultValue: string
// // //     }
// // //     |
// // //     {
// // //         type: "date",
// // //         inputFormat: "string",
// // //         defaultValue: "string"
// // //     }
// // // )




// // type goodParams<T> = {
// //     [prop in keyof T]: T[prop];
// // }