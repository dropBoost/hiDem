export function ButtonLinkDisplayDownloadDOC ({label, info, icon,linkHref, disabled}) {

    const dis = !linkHref

    return (
        <>
        <a href={`${linkHref}`} target="_blank" rel="noopener noreferrer">
        <button
        disabled={dis}
        className={`flex flex-row items-center text-xs font-light gap-2 border p-1 px-2 rounded-lg ${!dis ? "hover:bg-brand" : "hover:bg-none"} `}
        alt={label}
        >
            {icon} <font className="font-semibold">{info}</font>
        </button>
        </a>
        </>
    )
}