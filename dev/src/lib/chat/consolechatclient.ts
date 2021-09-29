import { ChatClient, ChatClientBase, ChatEventHandler } from "./chatclient.js";


export class ConsoleChatClient extends ChatClientBase {
    public test(message: string, sender?: string, self?: boolean) {
        this.onMessage({
            message,
            sender: sender || "",
            self: self || false
        });
    }

    override writeResult(result: string) {
        console.log(result);
    }
    
}