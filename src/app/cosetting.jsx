// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebook, faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
// import { faEnvelope, faSquarePhone, faGauge, faPhotoFilm, faCalendar, faKeyboard, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import { FaCarCrash, FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare, FaPhoneSquareAlt, FaEnvelope, FaUserCheck, FaUser, FaFileInvoiceDollar, FaUsers, FaArchive, FaHome } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { MdDashboard, MdOutlinePointOfSale } from "react-icons/md";
import { IoFitnessSharp, IoAnalyticsSharp  } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import { GiTowTruck } from "react-icons/gi";
import { TbEngine } from "react-icons/tb";
import { FaCar } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";

//ICONE SOCIAL

const ICONfacebook = <FaFacebookSquare/>
const ICONwhatsApp = <FaWhatsappSquare/>
const ICONtikTok = <AiFillTikTok />
const ICONinstagram = <FaInstagramSquare/>
const ICONtel = <FaPhoneSquareAlt/>
const ICONemail = <FaEnvelope/>

//ICONE GESTIONALE

const ICONzero = <FaHome/>
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
const ICONeleven = <FaUserCheck />

// FOOTER SIGN

export const poweredBy = "powered 💜 dropboost.it"
export const version = "0.0.1"

// PERSONALIZZAZIONI

export const companyName = "ECOCAR Autodemolizione"
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
    {name:'home', link:'/gestionale', linkActive:'home', icon: ICONzero, label:'home', attivo:'true', level:'admin'},
    {name:'dashboard', link:'/gestionale/dashboard', linkActive:'dashboard', icon: ICONone, label:'dashboard', attivo:'false', level:'admin'},
    {name:'azienda ritiro veicoli', link:'/gestionale/azienda-ritiro-veicoli', linkActive:'azienda-ritiro-veicoli', icon: ICONtwo, label:'Azienda Ritiro Veicoli', attivo:'true', level:'admin'},
    {name:'ritiri-demolizioni', link:'/gestionale/ritiri-demolizioni', linkActive:'ritiri-demolizioni', icon: ICONthree, label:'Ritiri Demolizioni', attivo:'true', level:'admin'},
    {name:'demolizioni', link:'/gestionale/certificati-demolizione', linkActive:'demolizioni', icon: ICONfour, label:'Certificati Demolizione', attivo:'true', level:'admin'},
    {name:'magazzino', link:'/gestionale/magazzino', linkActive:'magazzino', icon: ICONfive, label:'Magazzino', attivo:'false', level:'admin'},
    {name:'veicoli', link:'/gestionale/modelli-veicoli', linkActive:'modelli-veicoli', icon: ICONsix, label:'Veicoli', attivo:'true', level:'admin'},
    {name:'clienti', link:'/gestionale/clienti', linkActive:'clienti', icon: ICONseven, label:'Clienti', attivo:'false', level:'admin'},
    {name:'documenti', link:'/gestionale/documenti', linkActive:'documenti', icon: ICONeight, label:'Documenti', attivo:'false', level:'admin'},
    {name:'pos', link:'/gestionale/pos', linkActive:'pos', icon: ICONnine, label:'Pos', attivo:'false', level:'admin'},
    {name:'ritiro-online', link:'/gestionale/richieste-ritiro-online', linkActive:'ritiro-online', icon: ICONten, label:'Ritiri Online', attivo:'false', level:'admin'},
    {name:'utenti', link:'/gestionale/update-utenti', linkActive:'update-utenti', icon: ICONeleven, label:'Utenti', attivo:'false', level:'superadmin'},
  ]

export const moduliAccount = [
    {name:'ritiri-demolizioni', link:'/account/ritiri-demolizioni', linkActive:'ritiri-demolizioni', icon: ICONthree, label:'Ritiri Demolizioni', attivo:'true', level:'company'},
    {name:'veicoli-ritirati', link:'/account/veicoli-ritirati', linkActive:'veicoli-ritirati', icon: ICONfour, label:'Veicoli Ritirati', attivo:'true', level:'company'},
    {name:'aiuto', link:'/account/aiuto', linkActive:'aiuto', icon: ICONfour, label:'Aiuto', attivo:'true', level:'company'},
  ]

// MODULI INFO 

export const moduliInfo = [
    {name:'Info', link:'/gestionale/info', linkActive:'info', icon: ICONone, label:'Info', attivo:'true'},
    {name:'Aiuto', link:'/gestionale/aiuto', linkActive:'aiuto', icon: ICONtwo, label:'Aiuto', attivo:'true'},
    {name:'Test', link:'/gestionale/test', linkActive:'test', icon: ICONthree, label:'Test', attivo:'true'},
    {name:'Account', link:'/admin/account', linkActive:'account', icon: ICONfour, label:'Account', attivo:'true'},
  ]

