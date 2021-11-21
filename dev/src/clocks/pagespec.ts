// PAGESPEC
// For information on PAGESPEC - see the pagespec doc
// which I will probably write at some point.

import { PageSpec } from "../lib/pagehelper.js";
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
    format?: string = undefined;
    input?: string = undefined;
    inputFormat?: string = undefined;
    inputDuration?: number = NaN;
    inputDurationUnit?: string = undefined;

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
                result.push({status: ValidationStatus.Critical, message: `Can't countdown, no "countdown to" time specified in input.`} );
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