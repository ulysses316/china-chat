'use client'
import React from 'react'
import SignUpCard from '@/components/auth/SignUpCard';

export default function page() {
    return (
        <div
            className={`border-highlighter border fondo-vacio h-[100dvh] w-full flex justify-center items-center`}>
            <SignUpCard />
        </div>
    )
}
