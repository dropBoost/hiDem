"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import MENUhomepage from "@/app/componenti/menuHome"

export default function Dashboard() {

  return (
    <div className="flex flex-col gap-3 w-full h-full border">
      <div className="p-5 rounded-lg overflow-auto">
        <MENUhomepage/>
      </div>
    </div>
  )
}
