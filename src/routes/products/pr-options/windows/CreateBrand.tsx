import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { FormEvent } from "react";
import { createBrandAPI } from "../../../../redux/products/productsThunk";

import { InputText, InputTextarea } from "../../../../components/Input";
import { ButtonSubmit } from "../../../../components/Buttons";
import { CreateBrandDto } from "../../../../interfaces";


interface UpdateMarcaProps {
  closeButton: () => void;
}

export default function CreateBrand({ closeButton }: UpdateMarcaProps) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { id: branchId } = useSelector((s: RootState) => s.Branch);

  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange } = useForm<CreateBrandDto>({branchId, name:'', origin:''});

  const submitCreateBrand = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createBrandAPI(data));
  }

  return (
    <Windows tittle='Crear nueva marca' closeButton={closeButton} >
      <form className="px-5 py-3 relative" onSubmit={submitCreateBrand} >

        <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
          <span className="me-3" >INFORMACIÓN</span>
        </div>
        <InputText
          handleInputChange={handleInputChange}
          placeholder="*Nombre:"
          name="name"
          value={data.name}
          maxLenght={20}
          disabled={loadingData}
          required
        />
        <InputTextarea
          handleInputChange={handleInputChange}
          placeholder="Origen:"
          name="origin"
          value={data.origin||''}
          disabled={loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color='success' className="me-3" disabled={loadingData} loading={loadingData} spinner />
        </div>
      </form>
    </Windows>
  );
}