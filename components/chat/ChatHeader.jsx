'use client'
import { FaArrowLeft, FaVideo } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";


export default function ChatHeader({ userName, roomId }) {
    return (
        <div className='h-[8dvh] bg-new-gray flex justify-between items-center px-8'>
            <div className="flex justify-center items-center gap-4">
                <Link href={"/chat"}>
                    <FaArrowLeft className="text-xl" />
                </Link>
                {userName ? (
                    <p className='font-bold text-lg'>{userName}</p>
                ): null}
            </div>
            <div>
                <Link href={`/meeting/${roomId}`} className="flex justify-center items-center gap-2 py-2 px-4 rounded-full">
                    <FaVideo className="text-2xl" />
                </Link>
            </div>
        </div>
    )
}
