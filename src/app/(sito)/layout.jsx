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
      <main className="bg-neutral-100 flex-1 dark:bg-neutral-900 min-w-0 min-h-0 overflow-y-auto overscroll-contain">
        {children}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
