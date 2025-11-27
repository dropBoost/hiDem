'use client'

import { useTheme } from 'next-themes'
import { FaToggleOff, FaToggleOn  } from "react-icons/fa6";



export function ThemeToggle(){

    const {theme, setTheme} = useTheme();

    return (
        <button
            className='flex items-center justify-center m-1'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <FaToggleOn className='absolute rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-xl text-neutral-100'></FaToggleOn>
            <FaToggleOff className='absolute rotate-0 scale-0 dark:-rotate-0 dark:scale-100 text-xl'></FaToggleOff>
        </button>
    )
}
