import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { FormEvent } from "react";

import { InputText } from "../../../../components/Input";
import { ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import { CreateTipoMonedaVentaDto } from "../../../../interface";
import { createTipoMonedaVentaAPI } from '../../../../redux/ventas/ventasThunk';

interface UpdateTipoMonedaProps {
  closeButton: () => void;
}


export default function CreateTipoMoneda({ closeButton }: UpdateTipoMonedaProps) {
  const { id: sucursalId } = useSelector((s: RootState) => s.Sucursal);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange } = useForm<CreateTipoMonedaVentaDto>({sucursalId, abreviatura:'', nombre:''});

  const submitCreateTipoMoneda = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createTipoMonedaVentaAPI(data));
  }

  return (
    <Windows tittle='Crear nuevo tipo de moneda' closeButton={closeButton} >
      <form className="px-5 py-3 relative" onSubmit={submitCreateTipoMoneda} >

        <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
          <span className="me-3" >INFORMACIÓN</span>
        </div>
        <InputText
          handleInputChange={handleInputChange}
          placeholder="Nombre:"
          name="nombre"
          value={data.nombre}
          disabled={loadingData}
          required
        />
        <InputText
          handleInputChange={handleInputChange}
          placeholder="Abreviatura:"
          name="abreviatura"
          value={data.abreviatura}
          disabled={loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={loadingData} loading={loadingData} spinner />
        </div>
      </form>
    </Windows>
  );
}