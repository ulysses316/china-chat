import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChatSelect from "@/components/menu/ChatSelect";
import { cookies } from "next/headers"


export default async function page() {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('next-auth.session-token');
    const session = await getServerSession(authOptions);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/chat/get-chats?email=${session.user.email}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionCookie?.value}`,
            'Content-Type': 'application/json',
            'Cookie': `next-auth.session-token=${sessionCookie?.value}`,
        },
        credentials: 'include',
    });

    const users = await res.json();

    return (
        <main
            className={`grid bg-fondo min-h-[100dvh] gap-3 px-4 py-8 grid-cols-1 text-white`}>
            <div className={`border-highlighter border rounded-xl`}>
                <div className={`overflow-y-scroll max-h-[92vh]`}>
                    {users.data.map((item, index) => (
                        <ChatSelect user_data={item} key={`chat-${index}`}/>
                    ))}
                </div>
            </div>
        </main>
    );
}
