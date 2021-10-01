import { getAllUrlParameters } from '../lib/pathutils.js'

declare var dayjs: any;


export function init() {
    const params = getAllUrlParameters();

    const interval = parseInt(params["interval"]) ?? 250;
    const format = params["format"];
    //"DD MMM YYYY hh:mm:ss A"

    const clock = document.getElementById("clock");
    
    window.setInterval(() => {
        const time =  new Date();
        if (clock) clock.innerText = dayjs().format(format);
    }, interval);
}