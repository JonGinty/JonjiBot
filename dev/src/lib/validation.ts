


export interface IValidatable {
    validate(): ValidationResult[];
}



export function isValid(results?: ValidationResult[]): boolean {
    if (!results || !results.length) return true;
    return isResultValid(worstValidationResult(results));
}

export function isResultValid(result?: ValidationResult): boolean {
    if (!result) return true;
    return result.status < ValidationStatus.Error;
}

export function worstValidationResult(results?: ValidationResult[]): ValidationResult | undefined {
    if (!results || !results.length) return undefined;
    if (results.length === 1) return results[0];
    let worstResult = results[0];
    for (let i = 0; i < results.length; i++) {
        if (results[i].status > worstResult.status) worstResult = results[i];
    }
    return worstResult;
}

export type ValidationResult = {
    status: ValidationStatus;
    message: string;
}

export enum ValidationStatus {
    Success = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Critical = 4
}