import { AiOutlineLoading } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";


interface ButtonProps{
    label: string;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: ()=>void;
}

function ButtonSubmit({ label, disabled=false, loading=false }: ButtonProps) {
    return(
        <button
        className="bg-primary-3 bg-opacity-70 text-white px-5 py-1 rounded-full hover:bg-opacity-100 flex items-center disabled:cursor-no-drop disabled:bg-opacity-70"
        type='submit' 
        disabled={disabled}
        >
            {label}
            {loading &&
                <AiOutlineLoading className="ms-2 animate-spin h-[16px] w-[16px]" color="white" />
            }
        </button>
    )
}

function ButtonLogout({ label, className='', disabled=false, loading=false, onClick= ()=>{} }: ButtonProps){
    return(
        <button
        className={`${className} bg-danger bg-opacity-70 text-white px-5 py-1 rounded-full hover:bg-opacity-100 flex items-center disabled:cursor-no-drop disabled:bg-opacity-70`}
        type='button' 
        disabled={disabled}
        onClick={onClick}
        >
            {label}
            <TbLogout2 className="ms-2"/>
            {loading &&
                <AiOutlineLoading className="ms-2 animate-spin h-[16px] w-[16px]" color="white" />
            }
        </button>
    )
}

export { ButtonSubmit, ButtonLogout }