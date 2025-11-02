"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import MENUhomepage from "@/app/componenti/menuHome"

export default function Dashboard() {

  return (
    <div className="flex flex-col gap-3 w-full max-h-screen border">
      <div className="p-5 rounded-lg max-h-screen overflow-auto border border-red-700">
        <MENUhomepage/>
      </div>
    </div>
  )
}
