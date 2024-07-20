import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";


export default function ChatHeader({ userName }) {
    return (
        <div className='h-16 bg-new-gray flex justify-between items-center px-8'>
            <div className="flex justify-center items-center gap-4">
                <Link href={"/chat"}>
                    <FaArrowLeft className="text-xl" />
                </Link>
                {userName ? (
                    <p className='font-bold text-lg'>{userName}</p>
                ): null}
            </div>
            <div>
                {/* <Image src={"/logo.png"} width={150} height={150} alt="Logo de la app" /> */}
            </div>
        </div>
    )
}
