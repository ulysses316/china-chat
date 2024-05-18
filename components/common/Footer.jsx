import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className='bg-fondo justify-center items-center text-highlighter text-center'>
            <p className='flex justify-center items-center py-4'>
                Made with <FaHeart className='mx-2'/> by Ulysses316 for his wife
            </p>
        </footer>
    )
}
