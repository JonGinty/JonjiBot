import { getAllUrlParameters } from '../lib/pathutils.js'
import { ClocksPageParameters } from './pagespec.js';

declare var dayjs: any;

declare var dayjs_plugin_duration: any;
dayjs.extend(dayjs_plugin_duration);

declare var dayjs_plugin_customParseFormat: any;
dayjs.extend(dayjs_plugin_customParseFormat);

// class ClocksPageParameters implements PageParameters {
//     validate(): string[] {
        
//     }
//     build<T>(): Readonly<Omit<T, 'validate'>> {
//         throw new Error('Method not implemented.');
//     }

//     @urlParameter
//     interval?: number;

//     @urlParameter
//     format?: string;

//     @urlParameter
//     input?: string;

//     @urlParameter
//     inputFormat?: string;

//     @urlParameter
//     inputDurationUnit?: string;


// }



//type clockParams = Readonly<Bind<ClocksPageParameters>>;

// type foo = Readonly<{
//     [prop in keyof anotherClass]: anotherClass[prop]
// }>


// type clockParams = {
//     [name: string]: any;
//     interval: number;
//     format?: string;
//     clockEl: HTMLElement;
//     input?: string;
//     inputFormat?: string;
//     inputDuration?: number;
//     inputDurationUnit?: string;
// }




export function init(params: ClocksPageParameters) {
    const clock = document.getElementById("clock");
    if (!clock) throw "Clock element not found.";
    
    switch (params.mode) {
        case "clock":
            startClockMode(params, clock);
            break;
        case "countup":
            startCountup(params, clock);
            break;
        case "countdown":
            countDown(params, clock);
            break;
    }
}

function startClockMode(params: ClocksPageParameters, clockElement: HTMLElement) {
    window.setInterval(() => {
        //"DD MMM YYYY hh:mm:ss A"
        clockElement.innerText = dayjs().format(params.format);
    }, params.interval);
}

function startCountup(params: ClocksPageParameters, clockElement: HTMLElement) {
    const startTime = dayjs();
    
    window.setInterval(() => {
        const diff = dayjs().diff(startTime);
        // hh:mm:ss
        clockElement.innerText = dayjs.duration(diff).format(params.format);
    }, params.interval);
}

function countDown(params: ClocksPageParameters, clockElement: HTMLElement) {
    let endTime: any;
    if (params.inputDuration) {
        endTime = dayjs().add(params.inputDuration, params.inputDurationUnit || "second");
    } else if (params.input) {
        if (params.inputFormat) {
            endTime = dayjs(params.input, params.inputFormat);
            // TODO: not sure if we can check to see if a date was specified here, we only want to add 1 if only time is specified
            if (dayjs().isAfter(endTime)) endTime = endTime.add(1, "day"); // add day if end date was today
        } else {
            endTime = dayjs(params.input);
        }
    } else {
        throw "missing arguments";
    }

    window.setInterval(() => {
        let duration = dayjs.duration(0);
        let now = dayjs();
        if (now.isBefore(endTime)) duration = dayjs.duration(endTime.diff(now));
        clockElement.innerText = duration.format(params.format);
    }, params.interval)
}
