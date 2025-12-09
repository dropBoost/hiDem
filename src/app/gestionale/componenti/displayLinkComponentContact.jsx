//per renderlo dinamico rimuovere il commento all' <a> href con i dati collegati

export function LinkComponentContact ({label, info, icon,linkHref}) {
    return (
        <>
        <a href={`#`} target="_blank" rel="noopener noreferrer">
        {/* <a href={`${linkHref}${info}`} target="_blank" rel="noopener noreferrer"> */}
        <button
        className="
        flex flex-row items-center text-xs font-light gap-2
        border p-1 px-2 rounded-lg
        hover:bg-brand text-neutral-600 dark:text-neutral-400 hover:text-neutral-50 hover:border-brand dark:hover:text-neutral-50"
        alt={label}
        >
            {icon} <font className="font-semibold">{info}</font>
        </button>
        </a>
        </>
    )
}