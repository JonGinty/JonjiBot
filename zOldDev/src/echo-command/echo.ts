import { getChatClient } from "../lib/chatutils.js";

export function init() {
    getChatClient()?.subscribe(async message => message.message);
}