import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { FormEvent } from "react";

import { InputText } from "../../../../components/Input";
import { ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import { CreatePrecioVentaDto } from "../../../../interface";
import { createPrecioVentaAPI } from '../../../../redux/ventas/ventasThunk';

interface UpdatePrecioVentaProps {
  closeButton: () => void;
}


export default function CreatePrecioVenta({ closeButton }: UpdatePrecioVentaProps) {
  const { id: sucursalId } = useSelector((s: RootState) => s.Sucursal);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);

  const dispatch = useDispatch<AppDispatch>();

  const { data, handleInputChange } = useForm<CreatePrecioVentaDto>({sucursalId, codigo:'', descripcion:''});

  const submitCreatePrecioVenta = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createPrecioVentaAPI(data));
  }

  

  return (
    <Windows tittle='Crear nuevo precio de venta' closeButton={closeButton} >
      <form className="px-5 py-3 relative" onSubmit={submitCreatePrecioVenta} >

        <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
          <span className="me-3" >INFORMACIÓN</span>
        </div>
        <InputText
          handleInputChange={handleInputChange}
          placeholder="*Codigo:"
          name="codigo"
          value={data.codigo}
          disabled={loadingData}
          maxLenght={3}
          required
        />
        <InputText
          handleInputChange={handleInputChange}
          placeholder="Descripcion:"
          name="descripcion"
          value={data.descripcion as string}
          disabled={loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={loadingData} loading={loadingData} spinner />
        </div>
      </form>
    </Windows>
  );
}