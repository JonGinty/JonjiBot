import {ChatMessage} from "./chat/chatmessage.js";
import { ConsoleChatClient } from "./chat/consolechatclient.js";
import {getUrlParameter} from "./pathutils.js"


export function getChatClient() {
    const type = getUrlParameter("chatmode");
    switch (type) {
        case "console":
            const client = new ConsoleChatClient();
            (window as any)["jonjiBotConsoleClient"] = client;
            return client;
        case "direct":
            return void 0;
        default:
            return void 0;
    }
}


