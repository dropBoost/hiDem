"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import MENUaccount from "../componenti/menuAccount"

export default function ACCOUNTPage() {

  return (
    <div className="flex items-start justify-start overflow-x-auto">
      <MENUaccount/>
    </div>
  )
}