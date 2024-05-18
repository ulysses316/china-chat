import ChatSelect from "@/components/menu/ChatSelect";

export default function page() {
    return (
        <main
            className={`grid bg-fondo min-h-[100dvh] gap-3 px-4 py-8 grid-cols-1 text-white`}>
            <div className={`border-highlighter border rounded-xl`}>
                <div className={`overflow-y-scroll max-h-[92vh]`}>
                    <ChatSelect />
                    <ChatSelect />
                    <ChatSelect />
                    <ChatSelect />
                    <ChatSelect />
                    <ChatSelect />
                    <ChatSelect />
                    <ChatSelect />
                </div>
            </div>
        </main>
    );
}
