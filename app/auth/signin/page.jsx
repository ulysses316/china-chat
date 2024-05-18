'use client'
import LoginCard from "@/components/auth/LoginCard";

export default function page() {
    return (
        <div
            className={`border-highlighter border fondo-vacio h-[100dvh] w-full flex justify-center items-center`}>
            <LoginCard />
        </div>
    )
}
