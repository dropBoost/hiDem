import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/app/componenti/theme-toggle";
import Link from "next/link";

export function Header () {
    return(
        <>
        <div className="flex flex-row justify-between items-center py-5 px-5 w-full bg-companyPrimary">
            <div id="logo-cnt">
                <img src={'/logo-white.png'} width={150} height={50} quality={20} alt="logo-company"/>
            </div>
            <div id="menu-cnt">
                <h4>MENU</h4>
            </div>
            <div id="btn-cnt" className="flex flex-row items-end justify-center gap-3">
            <Link href="./download-demolizione"><Button variant='secondary'>SCARICA DEMOLIZIONE</Button></Link>
            <Link href="./gestionale"><Button>GESTIONALE</Button></Link>
            <ThemeToggle/>
            </div>
        </div>
        </>
    )
}

export function FooterInfo () {
    return(
        <>
        <div className="h-24 flex flex-row justify-between items-center bg-brand border w-full">
            <Button variant='secondary'>Button 2</Button>
            <Link href="./gestionale"><Button>GESTIONALE</Button></Link>
            <h1 className="p-5 text-neutral-50">CIAO</h1>
        </div>
        </>
    )
}

export function Footer () {
    return(
        <>
        <div className="flex flex-row justify-center items-center bg-neutral-900 w-full py-3">
            <h6>ECOCAR PARTS</h6>
        </div>
        </>
    )
}

export function SpanElementList ({icon, label, data}) {
  return(
    <div className="flex flex-row border dark:border-neutral-800 border-neutral-400 rounded-md p-1 px-3 gap-1 items-center justify-start text-sm text-neutral-500 dark:text-neutral-400">
      <div className="text-companyPrimary">{icon}</div>
      <span>{label}</span>
      <span className="dark:text-neutral-300 font-bold">{data}</span>
    </div>
  )
}