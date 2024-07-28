'use client'
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatFooter from "./ChatFooter";
import { useState } from "react";
import { io } from "socket.io-client";
import combineWords from "@/lib/utils/roomName";
import getAllMessages from "@/lib/actions/getAllMessage";

import { useRef, useEffect, useMemo } from "react";

export default function ChatLayout({ _id, userName, from, allMessages }) {
    const [sessionMessage, setSessionMessage] = useState([]);
    const [topScrollCount, setTopScrollCount] = useState(20);
    const [loading, setLoading] = useState(false);
    const [oldMessages, setOldMessages] = useState([]);
    const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`);
    const roomId = combineWords(_id, from).toString();
    const container = useRef()

    socket.emit("join-room", roomId);

    socket.on("receive-message", (message) => {
        setSessionMessage([...sessionMessage, message])
    })

    socket.on("receive-call", (meetingid) => {
        setSessionMessage([...sessionMessage, { meetingid: meetingid, sender: "meeting" }])
    })

    useEffect(() => {
        if (container.current) {
            container.current.scrollTop = container.current.scrollHeight;
        }
    }, [sessionMessage, allMessages]);

    const getOldMessages = async () => {
        setLoading(true);
        const response = await getAllMessages(from, _id, topScrollCount);
        setLoading(false);
        return response;
    }

    const handleTopScroll = async (scrollHeight) => {
        if (scrollHeight === 0 && topScrollCount !== 0) {
            const oldMessages = await getOldMessages();

            if (oldMessages.length === 0) {
                setTopScrollCount(0);
                return
            };

            setTopScrollCount(topScrollCount + 20);
            setOldMessages(prevMessages => [...prevMessages, ...oldMessages]);
        }
    }

    return (
        <section className="relative">
            <ChatHeader userName={userName} roomId={roomId} />
            <div className="flex flex-col gap-2 p-4 h-[83dvh] overflow-y-scroll bg-blue-200" ref={container} onScroll={() => { handleTopScroll(container.current.scrollTop); }}>


                {loading && <p>Loading...</p>}

                {oldMessages.length > 0 && oldMessages.slice(0).reverse().map((message) => (
                    <ChatMessage key={crypto.randomUUID()} data_message={message} fromThisUser={message.sender === from} />
                ))}

                {allMessages?.slice(0).reverse().map((message, index) => (
                    <ChatMessage key={crypto.randomUUID()} data_message={message} fromThisUser={message.sender === from} />
                ))}
                {sessionMessage?.map((message, index) => (
                    message.sender === "meeting" ? (
                        <a className="rounded-lg font-bold px-3 py-3 text-lg sm:text-base max-w-[100%] sm:max-w-[70%] lg:max-w-[45%] text-new-white bg-blue-600 self-start animate-pulse" href={`/meeting/${roomId}?meetingid=${message.meetingid}`}>Unirte a la video llamada</a>
                    ) : (<ChatMessage key={crypto.randomUUID()} data_message={message} fromThisUser={message.sender === from} />)
                ))}
            </div>
            <ChatFooter socket={socket} to={_id} from={from} roomId={roomId} />
        </section>
    );
}