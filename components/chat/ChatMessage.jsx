import React from 'react'

export default function ChatMessage({ data_message, fromThisUser=true }) {
    return (
        <div
            className={`rounded-md font-bold px-2 py-1 text-sm sm:text-base max-w-[100%] sm:max-w-[70%] lg:max-w-[45%] ${fromThisUser ? "bg-alter self-end" : "bg-highlighter self-start"
                } `}>
            {data_message?.message}
        </div>
    )
}
