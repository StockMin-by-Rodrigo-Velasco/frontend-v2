import { useDispatch, useSelector } from "react-redux";
import { ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import { InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent } from "react";
import { createAlmacenAPI } from "../../../../redux/almacenes/almacenThunks";

interface createAlmacenWindowInterface{
    closeButton: () => void; 
}

interface createForm{
    nombre: string;
    descripcion: string;
}


export default function CreateAlmacenWindow({closeButton}: createAlmacenWindowInterface) {
    const dispatch = useDispatch<AppDispatch>();
    const {loadingData} = useSelector((s:RootState) => s.Aplication);
    const { data, handleInputChange } = useForm<createForm>({nombre:'', descripcion:''});


    const formSubmit = (e:FormEvent) => {
        e.preventDefault();
        dispatch(createAlmacenAPI(data));
    }

  return (
    <Windows tittle="Nuevo almacen" closeButton={closeButton} >
        <form onSubmit={formSubmit} className="p-3" >
            <InputText
                name="nombre"
                placeholder="Nombre:"
                value={data.nombre}
                handleInputChange={handleInputChange}
            />
            <InputTextarea
                name="descripcion"
                placeholder="Descripcion:"
                value={data.descripcion}
                handleInputChange={handleInputChange}
            />

            <div className="w-full flex justify-center mt-3" >
                <ButtonSubmit color={ButtonColors.success} label="Guardar" loading={loadingData} spinner />
            </div>
        </form>
    </Windows>
  );
}