import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";


export default function ChatHeader() {
    return (
        <div className='h-16 bg-fondo flex justify-between items-center px-8 my-8'>
            <div className="flex justify-center items-center gap-4">
                <Link href={"/chat"}>
                    <FaArrowLeft className="text-xl" />
                </Link>
                <p className='font-bold text-lg'>Nombre del usuario</p>
            </div>
            <div>
                <Image src={"/logo.png"} width={150} height={150}/>
            </div>
        </div>
    )
}
