import { getAllUrlParameters } from '../lib/pathutils.js';
dayjs.extend(dayjs_plugin_duration);
dayjs.extend(dayjs_plugin_customParseFormat);
export function init() {
    var _a;
    const pageParams = getAllUrlParameters();
    const clock = document.getElementById("clock");
    if (!clock)
        throw "Clock element not found.";
    const clockParams = {
        interval: (_a = parseInt(pageParams["interval"])) !== null && _a !== void 0 ? _a : 250,
        format: pageParams["format"],
        clockEl: clock,
    };
    switch (pageParams["mode"]) {
        case "clock":
            startClockMode(clockParams);
            break;
        case "countup":
            startCountup(clockParams);
            break;
        case "countdown":
            const durationString = pageParams["input-duration"];
            if (typeof durationString === "string")
                clockParams.inputDuration = parseInt(durationString);
            clockParams.inputDurationUnit = pageParams["input-duration-unit"];
            clockParams.input = pageParams["input"];
            clockParams.inputFormat = pageParams["input-format"];
            countDown(clockParams);
            break;
    }
}
function startClockMode(params) {
    window.setInterval(() => {
        //"DD MMM YYYY hh:mm:ss A"
        params.clockEl.innerText = dayjs().format(params.format);
    }, params.interval);
}
function startCountup(params) {
    const startTime = dayjs();
    window.setInterval(() => {
        const diff = dayjs().diff(startTime);
        // hh:mm:ss
        params.clockEl.innerText = dayjs.duration(diff).format(params.format);
    }, params.interval);
}
function countDown(params) {
    let endTime;
    if (params.inputDuration) {
        endTime = dayjs().add(params.inputDuration, params.inputDurationUnit || "second");
    }
    else if (params.input) {
        if (params.inputFormat) {
            endTime = dayjs(params.input, params.inputFormat);
            // TODO: not sure if we can check to see if a date was specified here, we only want to add 1 if only time is specified
            if (dayjs().isAfter(endTime))
                endTime = endTime.add(1, "day"); // add day if end date was today
        }
        else {
            endTime = dayjs(params.input);
        }
    }
    else {
        throw "missing arguments";
    }
    window.setInterval(() => {
        let duration = dayjs.duration(0);
        let now = dayjs();
        if (now.isBefore(endTime))
            duration = dayjs.duration(endTime.diff(now));
        params.clockEl.innerText = duration.format(params.format);
    }, params.interval);
}
