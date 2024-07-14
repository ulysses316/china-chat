'use client'
import { useState } from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";

export default function ChatFooter({ socket, from, to }) {
    const [message, setMessage] = useState("");
    const [emojiVisible, setEmojiVisible] = useState(false);

    const handleChange = (message) => {
        setMessage(message)
    };

    const handdleSubmit = (e) => {
        e.preventDefault();
        socket.emit("chat message", {message: message, user_id: to, sender: from})
        setMessage("");
    };

    return (
        <form onSubmit={(e) => handdleSubmit(e)} className='absolute bottom-0 bg-fondo py-2 w-full flex gap-4 items-center px-3 justify-between'>
            <MdOutlineEmojiEmotions onClick={() => setEmojiVisible(!emojiVisible)} className="text-3xl" />
            {emojiVisible && (
                <div className="absolute bottom-20 md:left-16">
                    <EmojiPicker theme="dark" onEmojiClick={(emojiData) => setMessage(message + emojiData.emoji)} />
                </div>
            )}
            <textarea className="w-full rounded-md text-my_white bg-fondo border-highlighter border p-1" type="text" value={message} onChange={(e) => handleChange(e.target.value)} />
            <button type="submit">
                <IoMdSend className="text-2xl" />
            </button>
        </form>
    )
}
