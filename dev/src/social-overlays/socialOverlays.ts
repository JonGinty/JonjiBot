import {getAllUrlParameters} from "../lib/pathutils.js";
import { queryShorthand as q } from "../lib/domutils.js";

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

    const args = getAllUrlParameters();
    const showHelp = () => {
        q(".url-ish").do(el => el.style.display = "none");
        q(".help-text").do(el => el.style.display = "");
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
    
    q("#social-icon").do(el => el.classList.add("fa-" + (social.icon || args.type)));
    q("#social-name").do(el => el.innerText = (args.showurl ? social.url : "") + args.name);
    q(".url-ish").do(el => el.style.color = social.colour);
}
