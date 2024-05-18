import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";

export default function ChatLayout() {
    return (
        <section className="relative">
            <ChatHeader />
            <div className="flex flex-col gap-2 p-4 min-h-[84vh] max-h-[84vh] overflow-y-scroll">
                <ChatMessage data_message={true} />
                <ChatMessage data_message={false} />
                <ChatMessage data_message={true} />
                <ChatMessage data_message={false} />
            </div>
            <ChatFooter />
        </section>
    );
}
