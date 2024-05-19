import React from "react";
import ChatLayout from "@/components/chat/ChatLayout";

export default function page({ params }) {
    return (
        <main className={`grid bg-fondo min-h-[100dvh] gap-3 px-4 py-8 grid-cols-1 text-white`}>
            <div
                className={`border-highlighter border rounded-xl fondo-vacio`}>
                <ChatLayout />
            </div>
        </main>
    );
}
