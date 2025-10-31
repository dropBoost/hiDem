// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebook, faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
// import { faEnvelope, faSquarePhone, faGauge, faPhotoFilm, faCalendar, faKeyboard, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import { FaCarCrash, FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare, FaPhoneSquareAlt, FaEnvelope, FaUser, FaFileInvoiceDollar, FaUsers, FaArchive } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { MdDashboard, MdOutlinePointOfSale } from "react-icons/md";
import { IoFitnessSharp, IoAnalyticsSharp  } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import { GiTowTruck } from "react-icons/gi";
import { TbEngine } from "react-icons/tb";
import { FaCar } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";


const ICONfacebook = <FaFacebookSquare/>
const ICONwhatsApp = <FaWhatsappSquare/>
const ICONtikTok = <AiFillTikTok />
const ICONinstagram = <FaInstagramSquare/>
const ICONtel = <FaPhoneSquareAlt/>
const ICONemail = <FaEnvelope/>

const ICONone = <MdDashboard/>
const ICONtwo = <GiTowTruck/>
const ICONthree = <FaCarCrash />
const ICONfour = <BiSolidReport/>
const ICONfive = <TbEngine/>
const ICONsix = <FaCar/>
const ICONseven = <FaUsers/>
const ICONeight = <FaArchive/>
const ICONnine = <MdOutlinePointOfSale/>
const ICONten = <SiGoogleforms />

// FOOTER SIGN
export const poweredBy = "powered 💜 dropboost.it"

// PERSONALIZZAZIONI

export const companyName = "ECO-CAR Autodemolizione"
export const logoDark = "/logo-black.png"
export const logoLight = "/logo-white.png"
export const logoFullDark = "/logo-fullblack.png"
export const logoFullLight = "/logo-fullwhite.png"
export const logoExtendedDark = "/logo-extended-black.png"
export const logoExtendedLight = "/logo-extended-white.png"
export const logoExtendedFullDark = "/logo-extended-fullblack.png"
export const logoExtendedFullLight = "/logo-extended-fullwhite.png"
export const colorBrand = "#00597d"
export const colorDark = "#222222"
export const whatsAppContactLink = "#"
export const emailContact = "info@ecocarautodemolizioni.it"

// SOCIAL

export const socialLink = [
    {name:'whatsApp',link:whatsAppContactLink,icon: ICONwhatsApp, info:"+39 366 35 85 395",attivoWeb:"true"},
    {name:'facebook',link:'fasc',icon: ICONfacebook, info:"@facebbok",attivoWeb:"true"},
    {name:'instagram',link:'#',icon: ICONinstagram, info:"@instagram",attivoWeb:"true"},
    {name:'tiktok',link:'#',icon: ICONtikTok, info:"@tiktok",attivoWeb:"false"},
    {name:'email',link:'#',icon: ICONemail, info:"info@ecocarautodemolizioni.it",attivoWeb:"true"},
    {name:'tel',link:'dsda',icon: ICONtel, info:"+393293968096",attivoWeb:"true"},
  ]

// MODULI GESTIONALE

export const moduliGestionale = [
    {name:'dashboard', link:'/gestionale/dashboard', linkActive:'dashboard', icon: ICONone, label:'dashboard', attivo:'true'},
    {name:'azienda ritiro veicoli', link:'/gestionale/azienda-ritiro-veicoli', linkActive:'azienda-ritiro-veicoli', icon: ICONtwo, label:'Azienda Ritiro Veicoli', attivo:'true'},
    {name:'veicoli ritirati', link:'/gestionale/veicoli-ritirati', linkActive:'veicoli-ritirati', icon: ICONthree, label:'Veicoli Ritirati', attivo:'true'},
    {name:'certificati demolizione', link:'/redazione/certificati-demolizione', linkActive:'certificati-demolizione', icon: ICONfour, label:'Certificati Demolizione', attivo:'true'},
    {name:'magazzino', link:'/gestionale/magazzino', linkActive:'magazzino', icon: ICONfive, label:'Magazzino', attivo:'true'},
    {name:'veicoli', link:'/gestionale/modelli-veicoli', linkActive:'modelli-veicoli', icon: ICONsix, label:'Veicoli', attivo:'true'},
    {name:'clienti', link:'/gestionale/clienti', linkActive:'clienti', icon: ICONseven, label:'Clienti', attivo:'true'},
    {name:'documenti', link:'/gestionale/documenti', linkActive:'documenti', icon: ICONeight, label:'Documenti', attivo:'true'},
    {name:'pos', link:'/gestionale/pos', linkActive:'pos', icon: ICONnine, label:'Pos', attivo:'true'},
    {name:'richieste-ritiro-online', link:'/gestionale/richieste-ritiro-online', linkActive:'richieste-ritiro-online', icon: ICONten, label:'Richieste Ritiri', attivo:'true'},
  ]

