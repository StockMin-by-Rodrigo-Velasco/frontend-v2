
enum TypesButton{
    button = 'button',
    submit = 'submit',
}

interface ButtonProps{
    type: string;
    label: string;
    disabled?: boolean
}

function Button({ type, label, disabled=false }: ButtonProps) {

    return(
        <button
        className="bg-primary-3 text-white px-4 py-1 rounded-full hover:brightness-110"
        type={type === 'submit'? TypesButton.submit : TypesButton.button}
        disabled={disabled}
        >
            {label}            
        </button>
    )
}
export { Button }