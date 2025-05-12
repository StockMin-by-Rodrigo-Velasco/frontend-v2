import { AiOutlineLoading } from "react-icons/ai";

interface ButtonProps {
    label: string;
    color: 'primary'|'info'|'danger'|'success'|'warning';
    className?: string;
    spinner?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
}


export function Button({ label, color, className='', spinner=false, disabled=false, loading=false, onClick = ()=>{} }: ButtonProps) {
    return (
        <button
            className={`bg-${color} ${className} bg-opacity-80 flex items-center rounded-full px-2 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed`}
            type="button"
            disabled={disabled || loading}
            onClick={onClick}
        >{label} {(loading&&spinner)&& <AiOutlineLoading className="ms-2 animate-spin"/>}
        </button>
    )
}

export function ButtonSubmit({ label, color, className='', spinner=false, disabled=false, loading=false }: ButtonProps) {
    return (
        <button
            className={`${color} ${className} bg-opacity-80 flex items-center rounded-full px-2 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed`}
            type="submit"
            disabled={disabled || loading}
        >{label} {(loading&&spinner)&& <AiOutlineLoading className="ms-2 animate-spin"/>}
        </button>
    )
}
