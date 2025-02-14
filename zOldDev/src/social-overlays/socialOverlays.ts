import {getAllUrlParameters} from "../lib/pathutils.js";

export function init() {
    const socials = [
        {
            type: "youtube",
            url: "youtube.com/",
            colour: "#f93232"
        },
        {
            type: "twitch",
            url: "twitch.tv/",
            colour: "#6441a5"
        },
        {
            type: "facebook",
            url: "",
            colour: "#4267B2",
            icon: "facebook-square"
        },
        {
            type: "twitter",
            url: "twitter.com/",
            colour: "#1DA1F2",
            icon: "twitter-square"
        },
        {
            type: "instagram",
            url: "",
            colour: "#F77737",
        },
    ]

    const safeChange = (logic: (el: HTMLElement) => void, el?: HTMLElement | Element | null) => {
        if (!el) return;
        logic(el as HTMLElement);
    }

    const args = getAllUrlParameters();
    const showHelp = () => {
        safeChange(el => el.style.display = "none", document.querySelector(".url-ish"));
        safeChange(el => el.style.display = "", document.querySelector(".help-text"));
    }

    if (!args.type || !args.name) {
        showHelp();
        return;
    }
    
    const social = socials.find(s => s.type === args.type);
    if (!social) {
        showHelp();
        return;
    }
    
    safeChange(el => el.classList.add("fa-" + (social.icon || args.type)), document.querySelector("#social-icon"));
    safeChange(el => el.innerText = (args.showurl ? social.url : "") + args.name, document.querySelector("#social-name"));
    safeChange(el => el.style.color = args.customcol ?? social.colour, document.querySelector(".url-ish"));
}
