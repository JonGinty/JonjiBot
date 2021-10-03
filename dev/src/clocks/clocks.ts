import { getAllUrlParameters } from '../lib/pathutils.js'

declare var dayjs: any;
// declare var dayjs_plugin_relativeTime: any;
// dayjs.extend(dayjs_plugin_relativeTime);
declare var dayjs_plugin_duration: any;
dayjs.extend(dayjs_plugin_duration);


type clockParams = {
    interval: number;
    format?: string;
    clockEl: HTMLElement;
}

export function init() {
    const pageParams = getAllUrlParameters();
    const clock = document.getElementById("clock");
    if (!clock) throw "Clock element not found.";
    const clockParams: clockParams = {
        interval: parseInt(pageParams["interval"]) ?? 250,
        format: pageParams["format"],
        clockEl: clock
    }

    



    switch (pageParams["mode"]) {
        case "clock":
            startClockMode(clockParams);
            break;
        case "countup":
            startCountup(clockParams);
            break;
    }
}

function startClockMode(params: clockParams) {
    window.setInterval(() => {
        const time =  new Date();
        //"DD MMM YYYY hh:mm:ss A"
        params.clockEl.innerText = dayjs().format(params.format);
    }, params.interval);
}

function startCountup(params: clockParams) {
    const startTime = dayjs();
    
    window.setInterval(() => {
        const diff = dayjs().diff(startTime);
        // hh:mm:ss
        params.clockEl.innerText = dayjs.duration(diff).format(params.format);
    }, params.interval);
}

