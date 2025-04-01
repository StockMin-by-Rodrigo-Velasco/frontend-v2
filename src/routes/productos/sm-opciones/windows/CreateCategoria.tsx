import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { FormEvent } from "react";
import { createCategoriaAPI } from "../../../../redux/productos/productosThunk";

import { InputText, InputTextarea } from "../../../../components/Input";
import { ButtonColors, ButtonSubmit } from "../../../../components/Buttons";

interface DataCreateMarcaInterface {
  nombre: string;
  detalle: string;
}
interface UpdateMarcaProps {
  closeButton: () => void;
}

const initialStateMarca: DataCreateMarcaInterface = {
  nombre: '',
  detalle:''
}

export default function CreateCategoria({ closeButton }: UpdateMarcaProps) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange } = useForm<DataCreateMarcaInterface>(initialStateMarca);

  const submitCreateCategoria = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createCategoriaAPI(data));
  }

  return (
    <Windows tittle='Crear nueva categoría' closeButton={closeButton} >
      <form className="px-5 py-3 relative" onSubmit={submitCreateCategoria} >

        <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
          <span className="me-3" >INFORMACIÓN</span>
        </div>
        <InputText
          handleInputChange={handleInputChange}
          placeholder="*Nombre:"
          name="nombre"
          value={data.nombre}
          disabled={loadingData}
          maxLenght={20}
          required
        />
        <InputTextarea
          handleInputChange={handleInputChange}
          placeholder="Detalle:"
          name="detalle"
          value={data.detalle}
          disabled={loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={loadingData} loading={loadingData} spinner />
        </div>
      </form>
    </Windows>
  );
}