'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button" // shadcn
import { login, signup } from '../actions' // <-- server actions importate

export default function LoginForm() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const adminHandleChange = (setFormData) => (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="w-full flex-1 min-h-0 flex flex-col md:p-0 md:pe-3 px-4">
      {/* NESSUNA action globale: i bottoni usano formAction */}
      <form className="grid min-h-0 grid-cols-12 gap-4">
        <div id="twoStep" className="flex flex-col col-span-12 h-fit gap-3">
          <div className="col-span-12">
            <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">
              ACCESSO
            </h4>
          </div>

          <div className="grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 bg-white dark:bg-neutral-900 border">
            {/* EMAIL */}
            <FormField
              nome="email"
              label="Email"
              value={formData.email}
              colspan="col-span-12"
              mdcolspan="lg:col-span-6"
              onchange={adminHandleChange(setFormData)}
              type="email"
              status=""
            />

            {/* PASSWORD */}
            <FormField
              nome="password"
              label="Password"
              value={formData.password}
              colspan="col-span-12"
              mdcolspan="lg:col-span-6"
              onchange={adminHandleChange(setFormData)}
              type="password"
              status=""
            />

            {/* BOTTONI: usano formAction come nell'esempio */}
            <div className="col-span-12 flex gap-3">
              <Button type="submit" formAction={login}>
                Log in
              </Button>
              <Button type="submit" variant="outline" formAction={signup}>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export function FormField ({colspan, mdcolspan, nome, label, value, onchange, type, status}) {
  return (
    <div className={`${colspan} ${mdcolspan} min-w-0 ${status}`}>
      <Label htmlFor={nome}>{label}</Label>
      <Input
        type={type}
        id={nome}
        name={nome}
        placeholder={label}
        value={value}
        onChange={onchange}
        required
        className="w-full min-w-0 appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-brand"
      />
    </div>
  )
}