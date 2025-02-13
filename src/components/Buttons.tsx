import { AiOutlineLoading } from "react-icons/ai";

export enum ButtonColors{
    primary='bg-primary',
    info='bg-info',
    danger='bg-danger',
    success='bg-success',
    warning='bg-warning',
}

interface ButtonProps {
    label: string;
    color: ButtonColors;
    className?: string;
    spinner?: boolean;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
}


export function Button({ label, color, className='', spinner=false, disabled=false, loading=false, onClick = ()=>{} }: ButtonProps) {
    return (
        <button
            className={`${color} ${className} bg-opacity-80 flex items-center rounded-full px-2 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed`}
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

// function ButtonSubmit({ label, disabled=false, loading=false }: ButtonProps) {
//     return(
//         <button
//         className="bg-primary-3 bg-opacity-70 text-white px-5 py-1 rounded-full hover:bg-opacity-100 flex items-center disabled:cursor-no-drop disabled:bg-opacity-70"
//         type='submit' 
//         disabled={disabled}
//         >
//             {label}
//             {loading &&
//                 <AiOutlineLoading className="ms-2 animate-spin h-[16px] w-[16px]" color="white" />
//             }
//         </button>
//     )
// }

// function ButtonLogout({ label, className='', disabled=false, loading=false, onClick= ()=>{} }: ButtonProps){
//     return(
//         <button
//         className={`${className} bg-danger bg-opacity-70 text-white px-5 py-1 rounded-full hover:bg-opacity-100 flex items-center disabled:cursor-no-drop disabled:bg-opacity-70`}
//         type='button' 
//         disabled={disabled}
//         onClick={onClick}
//         >
//             {label}
//             <TbLogout2 className="ms-2"/>
//             {loading &&
//                 <AiOutlineLoading className="ms-2 animate-spin h-[16px] w-[16px]" color="white" />
//             }
//         </button>
//     )
// }
