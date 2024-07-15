import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className='bg-new-white justify-center items-center text-new-black text-center'>
            <p className='flex justify-center items-center py-3'>
                Made with <FaHeart className='mx-2 text-red-400'/> by Ulysses316 for his wife
            </p>
        </footer>
    )
}
