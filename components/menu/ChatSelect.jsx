import React from "react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";


export default function ChatSelect({ user_data }) {
    return (
        <Link href={`/chat/${user_data._id}`}>
            <div className="p-4 border-b hover:bg-new-gray  hover:border-b-2 flex gap-4 items-center"> {/*border-b-highlighter hover:border-b-alter */}
                <div className="bg-new-black rounded-full p-1">
                    <CiUser className="text-new-white font-bold text-2xl"/>
                </div>
                <div>
                    <h2 className="font-bold text-lg">{user_data.name}</h2>
                </div>
                {/* <p className="line-clamp-1 my-2 tex">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet non a
                    asperiores ab, est tenetur blanditiis, soluta animi dicta laboriosam
                    deleniti officiis? Ipsa totam possimus atque mollitia veniam dolore
                    sequi.
                </p> */}
            </div>
        </Link>
    );
}
