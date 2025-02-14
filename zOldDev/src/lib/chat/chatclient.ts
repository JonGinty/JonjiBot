import { ChatMessage } from "./chatmessage.js";

export interface ChatClient {
    subscribe: (handler: ChatEventHandler) => void;
}


export type ChatEventHandler = (message: ChatMessage) => Promise<string | void>;

export class ChatClientBase implements ChatClient {
    protected handlers: ChatEventHandler[] = [];

    public subscribe(handler: ChatEventHandler) {
        this.handlers.push(handler);
    }

    protected async onMessage(message: ChatMessage): Promise<void> {
        this.handlers.forEach(async h => {
            const result = await h(message);
            this.writeResultOrVoid(result);
        });
    }

    public writeResultOrVoid(result: string | void) {
        if (result) this.writeResult(result);
    }

    public writeResult(result: string) {

    }
}