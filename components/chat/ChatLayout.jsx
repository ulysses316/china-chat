'use client'
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { useState } from "react";
import { io } from "socket.io-client";
import combineWords from "@/lib/utils/roomName";

export default function ChatLayout({ _id, userName, from, allMessages }) {
    const [sessionMessage, setSessionMessage] = useState([]);
    const socket = io('http://localhost:3001');
    const roomId = combineWords(_id, from).toString();
    console.log(roomId);

    socket.on(roomId, (msg) => {
        setSessionMessage([...sessionMessage, msg])
    });

    return (
        <section className="relative">
            <ChatHeader userName={userName} />
            <div className="flex flex-col gap-2 p-4 min-h-[84vh] max-h-[84vh] overflow-y-scroll">
                {allMessages?.map((message, index) => (
                    <ChatMessage key={crypto.randomUUID()} data_message={message} fromThisUser={message.sender === from} />
                ))}
                {sessionMessage?.map((message, index) => (
                    <ChatMessage key={crypto.randomUUID()} data_message={message} fromThisUser={message.sender === from} />
                ))}
            </div>
            <ChatFooter socket={socket} to={_id} from={from} roomId={roomId}/>
        </section>
    );
}