'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import MenuSidebar from "@/app/componenti/menuGestionaleSidebar"
import { companyName } from "../cosetting"
import { ThemeToggle } from "@/app/componenti/theme-toggle"

export default function LAYOUTGestionale({ children }) {

    const [user, setUser] = useState(null)
    const router = useRouter()
    const [nomeSede, setNomeSede] = useState("")

    //LOGOUT
    async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
    }  

    return (
    <>
    <div className="grid grid-cols-12 grid-rows-12 h-full w-full justify-start items-start bg-neutral-300 dark:bg-neutral-950">
        <div className="
        col-span-12 row-span-1 col-start-1 row-start-1
        h-[100%] 
        bg-brand p-5
        flex lg:items-center lg:justify-between md:items-start md:justify-between items-center justify-between">
            <div className="flex flex-row items-center gap-5 max-h-full">
               {/* <Image
                src="/logo-fullwhite.png"
                width={20}
                height={50}
                alt={`logo ${companyName}`}
                className="max-h-full w-auto object-contain"
                /> */}
            </div>
            <div className="">
            </div>
            <div className="flex flex-row gap-2">
                <button
                    onClick={handleLogout}
                    className="py-1 px-2 w-fit text-xs bg-red-600 text-white rounded hover:bg-red-800"
                >
                     ESCI
                </button>
                <ThemeToggle/>
            </div>
        </div>
        <div className="
        col-start-1 row-start-2 md:col-span-1 md:row-span-11 col-span-12 row-span-1
        flex lg:items-end lg:justify-end md:items-start md:justify-center items-center justify-center
        h-full w-full 
        bg-neutral-900 dark:bg-neutral-900
        p-5"><MenuSidebar/></div>
        <div className="flex overflow-auto md:col-span-11 col-span-12 md:row-span-11 row-span-10 md:col-start-2 col-start-1 md:row-start-2 row-start-3 h-full bg-neutral-100 dark:bg-neutral-950 md:p-7 p-1">{children}</div>
    </div>
    </>    
    )
}