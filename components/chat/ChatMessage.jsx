import React from 'react'

export default function ChatMessage({ data_message }) {
    return (
        <div
            className={`rounded-md font-bold px-2 py-1 text-sm sm:text-base max-w-[100%] sm:max-w-[70%] lg:max-w-[45%] ${data_message ? "bg-alter self-end" : "bg-highlighter self-start"
                } `}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam hic recusandae porro, culpa minus fugit dolor? Vero magnam, quo nulla sunt temporibus obcaecati facere, vel ad voluptatem cum itaque aliquam!
        </div>
    )
}
