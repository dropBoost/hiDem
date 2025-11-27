'use client'

import Link from 'next/link'
import { moduliGestionale } from '../cosetting'
import { Footer, Header } from '@/app/componenti-sito/theme'

export default function LayoutGestionale({ children }) {


  return (
    <div className="
      flex flex-col h-dvh min-h-0 overflow-hidden supports-[height:100svh]:h-[100svh]
      bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100
    ">
      {/* Header */}
      <Header/>

      {/* Main scrollabile */}
      <main className="bg-neutral-100 flex-1 dark:bg-neutral-900 col-start-1 md:col-start-2 row-start-2 min-w-0 min-h-0 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
        {children}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

function Sidebar({ pathname, onNavigate, u }) {
  return (
    <nav className="flex h-full flex-col">
      <div className="h-[64px] flex items-center px-4 bg-brand">
        <span className="font-semibold">Gestione</span>
      </div>

      <div className="flex-1 overflow-y-auto py-3 bg-neutral-100 dark:bg-neutral-900 border-r">
        <ul className="space-y-1 px-2">
          {moduliGestionale.map((item, index) => {
            const active =
              pathname === item.link ||
              (item.link !== '/gestionale' && pathname?.startsWith(item.link))

            return (
              <li key={index}>
                <Link
                  href={item.link}
                  onClick={onNavigate}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition
                    ${active
                      ? 'bg-brand/60 text-neutral-100 dark:bg-brand/40 dark:text-neutral-100'
                      : 'text-neutral-700 hover:text-neutral-50 hover:bg-brand dark:text-neutral-500 dark:hover:text-neutral-900 dark:hover:bg-brand'
                    }`}
                >
                  <span className="text-lg leading-none">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="h-[48px] border-t border-neutral-200 dark:border-neutral-800 px-3 flex items-center text-xs text-neutral-500">
          {u?.email}
      </div>
    </nav>
  )
}

function MobileDrawer({ open, onClose, children }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />
      {/* Pannello */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px]
          bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 md:hidden
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {children}
      </div>
    </>
  )
}
