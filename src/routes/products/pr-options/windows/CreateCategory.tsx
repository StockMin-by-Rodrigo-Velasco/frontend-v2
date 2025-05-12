import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { FormEvent } from "react";
import { createCategoryAPI } from "../../../../redux/products/productsThunk";

import { InputText, InputTextarea } from "../../../../components/Input";
import { ButtonSubmit } from "../../../../components/Buttons";
import { CreateCategoryDto } from "../../../../interface";

interface UpdateCategoryProps {
  closeButton: () => void;
}

export default function CreateCategory({ closeButton }: UpdateCategoryProps) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { id: branchId } = useSelector((s: RootState) => s.Branch);

  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange } = useForm<CreateCategoryDto>({ branchId, name:'', details:'' });

  const submitCreateCategoria = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createCategoryAPI(data));
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
          name="name"
          value={data.name}
          disabled={loadingData}
          maxLenght={20}
          required
        />
        <InputTextarea
          handleInputChange={handleInputChange}
          placeholder="Detalle:"
          name="details"
          value={data.details||''}
          disabled={loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color='success' className="me-3" disabled={loadingData} loading={loadingData} spinner />
        </div>
      </form>
    </Windows>
  );
}