import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { FormEvent } from "react";
import { createMarcaAPI } from "../../../../redux/products/productosThunk";

import { InputText, InputTextarea } from "../../../../components/Input";
import { ButtonColors, ButtonSubmit } from "../../../../components/Buttons";

interface DataCreateMarcaInterface {
  nombre: string;
  origen: string;
}
interface UpdateMarcaProps {
  closeButton: () => void;
}

const initialStateMarca: DataCreateMarcaInterface = {
  nombre: '',
  origen:''
}

export default function CreateBrand({ closeButton }: UpdateMarcaProps) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange } = useForm<DataCreateMarcaInterface>(initialStateMarca);

  const submitCreateMarca = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createMarcaAPI(data, "LOADING-DATA-COMPLETE"));
  }

  return (
    <Windows tittle='Crear nueva marca' closeButton={closeButton} >
      <form className="px-5 py-3 relative" onSubmit={submitCreateMarca} >

        <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
          <span className="me-3" >INFORMACIÓN</span>
        </div>
        <InputText
          handleInputChange={handleInputChange}
          placeholder="*Nombre:"
          name="nombre"
          value={data.nombre}
          maxLenght={20}
          disabled={loadingData}
          required
        />
        <InputTextarea
          handleInputChange={handleInputChange}
          placeholder="Origen:"
          name="origen"
          value={data.origen}
          disabled={loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={loadingData} loading={loadingData} spinner />
        </div>
      </form>
    </Windows>
  );
}