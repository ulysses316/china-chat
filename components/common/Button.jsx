import React from 'react'
import Link from 'next/link'

export default function Button({ onClick, href, type, children, className }) {
    if (onClick && !href && !type) {
        return (
            <button className={`text-new-white rounded-md bg-new-black border border-new-gray px-4 py-2 font-bold text-center ${className}`} onClick={onClick} type='button'>
                {children}
            </button>
        )
    }

    else if (href && !type && !onClick) {
        return (
            <Link href={href} className={`text-new-white rounded-md bg-new-black border border-new-gray px-4 py-2 font-bold text-center ${className}`} onClick={onClick}>
                {children}
            </Link>
        )
    }

    else if (type && !onClick && !href) {
        return (
            <button className={`text-new-white rounded-md bg-new-black border border-new-gray px-4 py-2 font-bold text-center ${className}`} type='submit'>
                {children}
            </button>
        )
    }

    else {
        throw new Error("You must provide a valid property for this component. (onClick, href, type)")
    }
}
