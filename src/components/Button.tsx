import { AiOutlineLoading } from "react-icons/ai";

enum TypesButton{
    button = 'button',
    submit = 'submit',
}

interface ButtonProps{
    type: string;
    label: string;
    disabled?: boolean
    loading?: boolean
}

function Button({ type, label, disabled=false, loading= false }: ButtonProps) {

    return(
        <button
        className="bg-primary-3 bg-opacity-70 text-white px-2 py-1 rounded-full hover:bg-opacity-100 flex items-center disabled:cursor-no-drop disabled:bg-opacity-70"
        type={type === 'submit'? TypesButton.submit : TypesButton.button}
        disabled={disabled}
        >
            {label}
            {loading &&
                <AiOutlineLoading className="ms-1 animate-spin h-[16px] w-[16px]" color="white" />
            }
        </button>
    )
}
export { Button }