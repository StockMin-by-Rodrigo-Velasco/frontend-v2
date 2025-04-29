import { useDispatch, useSelector } from "react-redux";
import { ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import { InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent } from "react";
import { updateAlmacenAPI } from "../../../../redux/warehouses/almacenThunks";
import { Almacen } from "../../../../interface";

interface UpdateAlmacenWindowInterface{
    closeButton: () => void; 
    almacen: Almacen
}

interface updateForm{
    nombre: string;
    descripcion: string;
}


export default function UpdateAlmacenWindow({closeButton, almacen}: UpdateAlmacenWindowInterface) {
    const dispatch = useDispatch<AppDispatch>();
    const {loadingData} = useSelector((s:RootState) => s.Aplication);
    const {id:sucursalId} = useSelector((s:RootState) => s.Branch);
    const { data, handleInputChange } = useForm<updateForm>({nombre: almacen.nombre, descripcion: almacen.descripcion || ''});


    const formSubmit = (e:FormEvent) => {
        e.preventDefault();
        dispatch(updateAlmacenAPI({sucursalId, almacenId:almacen.id, ...data}, "LOADING-DATA-COMPLETE"));
    }

  return (
    <Windows tittle="Modificar almacén" closeButton={closeButton} >
        
        <form onSubmit={formSubmit} className="p-3" >
            <InputText
                name="nombre"
                placeholder="*Nombre:"
                value={data.nombre}
                maxLenght={20}
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