import React from "react";
import { connectMongo } from "@/lib/db/mongoose";
import User from "@/lib/models/users";
import ChatLayout from "@/components/chat/ChatLayout";
import getAllMessages from "@/lib/actions/getAllMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function page({ params }) {
    const { _id } = params;
    const userInfo = await getUserInfo(_id)
    const session = await getServerSession(authOptions)
    const messages = await getAllMessages(session.user.id, _id)
    const plainMessages = await JSON.parse(JSON.stringify(messages));

    return (
        <main className={`grid bg-new-white min-h-[100dvh] gap-3 grid-cols-1 text-new-black`}>
            <div
                className={`border`}>
                <ChatLayout userName={userInfo.name} _id={_id} from={session.user.id} allMessages={plainMessages}/>
            </div>
        </main>
    );
}


const getUserInfo = async (_id) => {
    'use server'
    try {
        await connectMongo();
        const user = await User.findOne({ _id });
        return user;
    } catch (error) {
        console.error(error);
        return null
    }
}