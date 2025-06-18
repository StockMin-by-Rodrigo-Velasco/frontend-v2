import { IoInformationCircleOutline } from "react-icons/io5";

interface ConfirmDialogProp {
    title: string;
    description: string;
    closeButton: () => void;
    action: () => void;
}

export default function ConfirmDialog({ title, description, closeButton, action }: ConfirmDialogProp) {
    return (
        <div className={`bg-black/15 backdrop-blur-[2px] absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center z-20`}>
            <div className="bg-white max-w-[50vw] rounded-lg text-black overflow-hidden shadow-2xl">
                <div className="flex items-center p-2" >
                    <IoInformationCircleOutline className="text-info text-[60px]"/>
                    <div className="p-2">
                        <h1 className="font-semibold" >{title}</h1>
                        <p>{description}</p>

                    </div>
                </div>
                <div className="p-2 flex justify-end" >
                    <button 
                        onClick={closeButton}
                        className="bg-white border border-info text-info rounded-full px-2 me-2" 
                    >Cancelar</button>
                    <button
                    onClick={() => {action(); closeButton()}}
                    className="bg-info border border-info text-white rounded-full px-2"
                    >Aceptar</button>
                </div>
            </div>

        </div>
    );
}