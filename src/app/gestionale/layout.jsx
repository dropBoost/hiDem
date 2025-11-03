'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { moduliGestionale } from '../cosetting'

const NAV = [
  { href: '/gestionale', label: 'Dashboard', icon: '🏠' },
  { href: '/gestionale/azienda-ritiro-veicoli', label: 'Inserimento Azienda', icon: '🏢' },
  { href: '/gestionale/pratiche', label: 'Pratiche', icon: '📄' },
  { href: '/gestionale/bozze', label: 'Bozze', icon: '📝' },
  { href: '/gestionale/impostazioni', label: 'Impostazioni', icon: '⚙️' },
]

export default function LayoutGestionale({ children }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="
      grid h-dvh min-h-0 overflow-hidden supports-[height:100svh]:h-[100svh]
      grid-cols-1 grid-rows-[64px_1fr_48px]
      md:grid-cols-[280px_1fr]
      bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100
    ">
      {/* Sidebar desktop */}
      <aside className="hidden md:block md:row-span-3 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <Sidebar pathname={pathname} />
      </aside>

      {/* Drawer mobile */}
      <MobileDrawer open={open} onClose={() => setOpen(false)}>
        <Sidebar pathname={pathname} onNavigate={() => setOpen(false)} />
      </MobileDrawer>

      {/* Header */}
      <header className="
        col-start-1 md:col-start-2 row-start-1
        flex items-center justify-between gap-3 px-3 md:px-4
        border-b border-neutral-200 dark:border-neutral-800
        bg-white/80 dark:bg-neutral-900/80 backdrop-blur
      ">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800"
            onClick={() => setOpen(true)}
            aria-label="Apri menu"
          >
            {/* Icona hamburger */}
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <span className="font-medium">Backoffice Demolizioni</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Qui puoi aggiungere ThemeToggle, user menu, search, ecc. */}
        </div>
      </header>

      {/* Main scrollabile */}
      <main className="col-start-1 md:col-start-2 row-start-2 min-w-0 min-h-0 overflow-y-auto overscroll-contain [scrollbar-gutter:stable]">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="
        col-start-1 md:col-start-2 row-start-3
        flex items-center justify-between px-3 md:px-4 text-sm
        border-t border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
      ">
        <span>© {new Date().getFullYear()} – Azienda Demolizioni</span>
        <span className="text-neutral-500">v1.0.0</span>
      </footer>
    </div>
  )
}

function Sidebar({ pathname, onNavigate }) {
  return (
    <nav className="flex h-full flex-col">
      <div className="h-[64px] flex items-center px-4 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-semibold">Gestione</span>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
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
                      ? 'bg-violet-100 text-neutral-900 dark:bg-brand/40 dark:text-neutral-900'
                      : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800'
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
        Utente: admin@example.com
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
          bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 md:hidden
          transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {children}
      </div>
    </>
  )
}
