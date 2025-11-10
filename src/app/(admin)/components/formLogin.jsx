'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginFormSubmit } from "../actions"
import ButtonLoginFormSubmit from "./buttonSubmitLogin"

export default function LoginForm() {

    const [formData, setFormData] = useState({
        username:"",
        password:""
    })

    const adminHandleChange = (setFormData) => (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className={`w-full flex-1 min-h-0 flex flex-col md:p-0 md:pe-3 px-4`}>
            <form action={loginFormSubmit} className="grid min-h-0 grid-cols-12 gap-4">
                <div id="twoStep" className={`flex flex-col col-span-12 h-fit gap-3`}>
                    <div className="col-span-12">
                        <h4 className="text-[0.6rem] font-bold text-dark dark:text-brand border border-brand px-3 py-2 w-fit rounded-xl">SPECIFICHE VEICOLO</h4>
                    </div>
                    <div className='grid grid-cols-12 gap-4 p-6 col-span-12 rounded-2xl shadow-lg min-w-0 bg-white dark:bg-neutral-900 border'>
                        <FormField nome="username" label='Username' value={formData.username} colspan="col-span-6" mdcolspan="lg:col-span-6" onchange={adminHandleChange(setFormData)} type='text'/>
                        <FormField nome="password" label='Password' value={formData.password} colspan="col-span-6" mdcolspan="lg:col-span-6" onchange={adminHandleChange(setFormData)} type='password'/>
                        <ButtonLoginFormSubmit messaggio="invio in attesa" label="INVIA"/>
                    </div>  
                </div>
            </form>
        </div>
    )
}


export function FormField ({colspan, mdcolspan, nome,label, value, onchange, type, status}) {
    return (
        <div className={`${colspan} ${mdcolspan} min-w-0 ${status} `}>
        <Label htmlFor={nome}>{label}</Label>
        <Input
            type={type}
            id={nome}
            placeholder={label}
            name={nome}
            value={value}
            onChange={onchange}
            
            className={`w-full min-w-0 appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:border-brand`}
        />
        </div>
    )
}