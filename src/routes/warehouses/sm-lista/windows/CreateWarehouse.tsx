import { useDispatch, useSelector } from "react-redux";
import { ButtonSubmit } from "../../../../components/Buttons";
import { InputText, InputTextarea } from "../../../../components/Input";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent } from "react";
import { CreateWarehouseDto } from "../../../../interfaces";
import Windows from "../../../../components/Windows";
import { createWarehouseAPI } from "../../../../redux/warehouses/warehousesThunk";

interface CreateAlmacenWindowProp{
    closeButton: () => void; 
}

export default function CreateWarehouse({closeButton}: CreateAlmacenWindowProp) {
    const {id:branchId} = useSelector((s:RootState) => s.Branch);
    const {loadingData} = useSelector((s:RootState) => s.Aplication);

    const dispatch = useDispatch<AppDispatch>();

    const { data, handleInputChange } = useForm<CreateWarehouseDto>({branchId, name:'', description:''});

    const formSubmit = (e:FormEvent) => {
        e.preventDefault();
        // console.log(data);
        dispatch(createWarehouseAPI(data));
    }

  return (
    <Windows tittle="Nuevo almacen" closeButton={closeButton} >
        <form onSubmit={formSubmit} className="p-3" >
            <InputText
                name="name"
                placeholder="*Nombre:"
                value={data.name}
                maxLenght={20}
                handleInputChange={handleInputChange}
            />
            <InputTextarea
                name="description"
                placeholder="Descripcion:"
                value={data.description||''}
                handleInputChange={handleInputChange}
            />

            <div className="w-full flex justify-center mt-3" >
                <ButtonSubmit color='success' label="Guardar" loading={loadingData} spinner />
            </div>
        </form>
    </Windows>
  );
}