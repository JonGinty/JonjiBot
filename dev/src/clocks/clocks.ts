import { getAllUrlParameters } from '../lib/pathutils.js'

declare var dayjs: any;
// declare var dayjs_plugin_relativeTime: any;
// dayjs.extend(dayjs_plugin_relativeTime);
declare var dayjs_plugin_duration: any;
dayjs.extend(dayjs_plugin_duration);

declare var dayjs_plugin_customParseFormat: any;
dayjs.extend(dayjs_plugin_customParseFormat);


type clockParams = {
    interval: number;
    format?: string;
    clockEl: HTMLElement;
    countDownTo?: string;
    countDownToFormat?: string;
    countDownDuration?: number 
}

export function init() {
    const pageParams = getAllUrlParameters();
    const clock = document.getElementById("clock");
    if (!clock) throw "Clock element not found.";
    const clockParams: clockParams = {
        interval: parseInt(pageParams["interval"]) ?? 250,
        format: pageParams["format"],
        clockEl: clock,
    }

    switch (pageParams["mode"]) {
        case "clock":
            startClockMode(clockParams);
            break;
        case "countup":
            startCountup(clockParams);
            break;
        case "countdown":
            const durationString = pageParams["countdown-duration-seconds"];
            if (typeof durationString === "string") clockParams.countDownDuration = parseInt(durationString);
            clockParams.countDownTo = pageParams["countdown-to"]
            clockParams.countDownToFormat = pageParams["countdown-to-input-format"];
            countDown(clockParams);
            break;
    }
}

function startClockMode(params: clockParams) {
    window.setInterval(() => {
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

function countDown(params: clockParams) {
    let endTime: any;
    if (params.countDownDuration) {
        endTime = dayjs().add(params.countDownDuration, "second");
    } else if (params.countDownTo) {
        if (params.countDownToFormat) {
            endTime = dayjs(params.countDownTo, params.countDownToFormat);
            // TODO: not sure if we can check to see if a date was specified here, we only want to add 1 if only time is specified
            if (dayjs().isAfter(endTime)) endTime = endTime.add(1, "day"); // add day if end date was today
        } else {
            endTime = dayjs(params.countDownTo);
        }
    } else {
        throw "missing arguments";
    }

    window.setInterval(() => {
        let duration = dayjs.duration(0);
        let now = dayjs();
        if (now.isBefore(endTime)) duration = dayjs.duration(endTime.diff(now));
        params.clockEl.innerText = duration.format(params.format);
    }, params.interval)
}

