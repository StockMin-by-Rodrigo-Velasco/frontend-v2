import { useDispatch, useSelector } from "react-redux";
import { ButtonSubmit } from "../../../../components/Buttons";
import { InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent } from "react";
import { updateWarehouseAPI } from "../../../../redux/warehouses/warehousesThunk";
import { UpdateWarehouseDto, Warehouse } from "../../../../interfaces";

interface UpdateAlmacenWindowInterface{
    closeButton: () => void; 
    warehouse: Warehouse
}

export default function UpdateWarehouse({closeButton, warehouse}: UpdateAlmacenWindowInterface) {
    const dispatch = useDispatch<AppDispatch>();
    const {loadingData} = useSelector((s:RootState) => s.Aplication);
    const {id:branchId} = useSelector((s:RootState) => s.Branch);
    const { data: updateWarehouse, handleInputChange } = useForm<UpdateWarehouseDto>({
        branchId, 
        id:warehouse.id, 
        name: warehouse.name, 
        description: warehouse.description || ''
    });

    const formSubmit = (e:FormEvent) => {
        e.preventDefault();
        dispatch(updateWarehouseAPI(updateWarehouse));
    }

  return (
    <Windows tittle="Modificar almacén" closeButton={closeButton} >
        
        <form onSubmit={formSubmit} className="p-3" >
            <InputText
                name="name"
                placeholder="*Nombre:"
                value={updateWarehouse.name||''}
                maxLenght={20}
                handleInputChange={handleInputChange}
            />
            <InputTextarea
                name="description"
                placeholder="Descripcion:"
                value={updateWarehouse.description||''}
                handleInputChange={handleInputChange}
            />

            <div className="w-full flex justify-center mt-3" >
                <ButtonSubmit color='success' label="Guardar" loading={loadingData} spinner />
            </div>
        </form>
    </Windows>
  );
}