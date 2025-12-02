'use client'

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HomeButton, ThemeToggle, LogoutButton, PlusButton } from '@/app/componenti/button'
import { useAdmin } from '@/app/admin/components/AdminContext'

export function Header () {

    const [openMenu, setOpenMenu] = useState(false)

    return(
        <>
        <div className="flex lg:flex-row flex-col gap-3 justify-between items-center py-5 px-5 w-full bg-companyPrimary">
            <div id="logo-cnt" className="w-32">
                <img src={'/logo-white.png'} width={150} height={50} quality={20} alt="logo-company"/>
            </div>
            <div id="btn-cnt" className="flex flex-row items-center justify-between gap-3 w-full px-7">
                <div id="menu-cnt">
                    <button className="flex flex-row items-center justify-between rounded-lg px-4 py-1 gap-2 bg-neutral-100 text-xs dark:text-neutral-900" onClick={()=>{setOpenMenu(prev => !prev)}}><FaBars/>MENU</button>
                </div>
                <div className="flex flex-row items-center justify-end gap-3">
                    <Link href="/download-demolizione"><button className="bg-neutral-100 text-xs dark:text-neutral-900 px-2 py-1 rounded-md">SCARICA DEMOLIZIONE</button></Link>
                    <Link href="/gestionale"><button className="bg-neutral-100 text-xs px-2 py-1 dark:text-neutral-900 rounded-md">GESTIONALE</button></Link>
                    <ThemeToggle/>
                </div>
            </div>
        </div>
        <div className={`${openMenu? "flex flex-row p-5 gap-10" : "hidden"} `}>
            <div id="col-one" className="">
                <h3 className="text-neutral-500">CIAO</h3>
            </div>
            <div id="col-one" className="">
                <h3 className="text-neutral-500">CIAO</h3>
            </div>
        </div>
        </>
    )
}

export function FooterInfo () {
    return(
        <>
        <div className="h-24 flex flex-row justify-between items-center bg-brand border w-full">
            <button variant='secondary'>Button 2</button>
            <Link href="/gestionale"><button>GESTIONALE</button></Link>
            <h1 className="p-5 text-neutral-50">CIAO</h1>
        </div>
        </>
    )
}

export function Footer () {
    return(
        <>
        <div className="flex flex-row justify-center items-center bg-neutral-900 w-full py-3">
            <span>© {new Date().getFullYear()} – Azienda Demolizioni</span>
            <h6>ECOCAR PARTS</h6>
        </div>
        </>
    )
}

export function SpanElementList ({icon, label, data}) {
  return(
    <div className="flex flex-row rounded-md p-1 px-3 gap-1 items-center justify-start text-sm text-neutral-500 dark:text-neutral-400">
      <div className="text-companyPrimary">{icon}</div>
      <span>{label}</span>
      <span className="dark:text-neutral-300 font-bold">{data}</span>
    </div>
  )
}

export function SpanElementListBorder ({icon, label, data}) {
  return(
    <div className="flex flex-row border dark:border-neutral-800 border-neutral-400 rounded-md p-1 px-3 gap-1 items-center justify-start text-sm text-neutral-500 dark:text-neutral-400">
      <div className="text-companyPrimary">{icon}</div>
      <span>{label}</span>
      <span className="dark:text-neutral-300 font-bold">{data}</span>
    </div>
  )
}

export function HeaderAccount () {

    const { utente, azienda, checking } = useAdmin()
    const [openUpBar, setOpenUpBar] = useState(false)

    return(
        <>
        <div className={`${openUpBar ? "flex flex-row justify-end gap-10 dark:bg-neutral-950 bg-neutral-400 p-5" : "hidden"} `}>
            <div id="col-one" className="">
                <ThemeToggle/>
            </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-3 justify-between items-center py-5 px-5 w-full bg-companyPrimary">
            <div id="logo-cnt" className="w-32">
                <img src={'/logo-white.png'} width={150} height={50} quality={20} alt="logo-company"/>
            </div>
            <div id="btn-cnt" className="flex flex-row items-center justify-end gap-3 px-7">
                <span className="text-xs text-neutral-300 rounded-lg max-h-full">{utente?.email}</span>
                <PlusButton open={() => setOpenUpBar(prev => !prev)}/>
                <LogoutButton/>
            </div>
        </div>
        </>
    )
}