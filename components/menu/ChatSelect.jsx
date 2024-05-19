import React from "react";
import Link from "next/link";

export default function ChatSelect({ user_data }) {
    return (
        <Link href={`/chat/${user_data._id}`}>
            <div className="p-4 border-b border-b-highlighter hover:border-b-alter hover:border-b-2">
                <h2 className="font-bold text-lg">{user_data.name}</h2>
                <p className="line-clamp-1 my-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet non a
                    asperiores ab, est tenetur blanditiis, soluta animi dicta laboriosam
                    deleniti officiis? Ipsa totam possimus atque mollitia veniam dolore
                    sequi.
                </p>
            </div>
        </Link>
    );
}
