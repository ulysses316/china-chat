'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react";
import { Theme } from '@radix-ui/themes';

export default function GlobalProviders({ children, session }) {
    return (
        <SessionProvider session={session}>
            <Theme>
                {children}
            </Theme>
        </SessionProvider>
    )
}
