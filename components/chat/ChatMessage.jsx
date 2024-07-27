import React from 'react'

export default function ChatMessage({ data_message, fromThisUser=true }) {
    return (
        <div
            className={`rounded-lg font-bold px-3 py-1 text-lg sm:text-base max-w-[100%] sm:max-w-[70%] lg:max-w-[45%] text-new-white ${fromThisUser ? "bg-alter self-end" : "bg-highlighter self-start"
                } `}>
            {data_message?.message}
        </div>
    )
}
