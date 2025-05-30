import { FormEvent, useState } from "react";
import { InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from '../../../../hooks/useForm';
import { Button, ButtonSubmit } from "../../../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { deleteCategoryAPI, updateCategoryAPI } from "../../../../redux/products/productsThunk";
import { hideNotification, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
import { BsFillTrashFill } from "react-icons/bs";
import { Category } from "../../../../interfaces";

interface UpdateCategoriaProps {
  closeButton: () => void;
  dataUpdate: Category
}

export default function UpdateCategory({ dataUpdate, closeButton }: UpdateCategoriaProps) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { idDeletedCategory: idUltimaCategoriaEliminada } = useSelector((s: RootState) => s.Products);
  // const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange, resetData } = useForm<Category>(dataUpdate);
  const [editMode, setEditMode] = useState(false);

  const cancelUpdate = () => {
    setEditMode(false);
    resetData();
  }

  const submitUpdate = (e: FormEvent) => {
    e.preventDefault();
    const { deleted, ...res } = data;
    dispatch(updateCategoryAPI(res));
  }

  // const deleteCategory = () => {
  //   if (typeNotification === 'WARNING' && showNotification) {
  //     dispatch(deleteCategoryAPI(dataUpdate.id));
  //     dispatch(hideNotification());
  //   } else {
  //     dispatch(showNotificationWarning(
  //       { 
  //         tittle: 'Eliminar categoría', 
  //         description: 'Si deseas continuar vuelve a presionar el botón de eliminación, caso contrario cierra este mensaje' 
  //       }))
  //   }
  // }

  return (
    <Windows tittle='Detalles de categoría' closeButton={closeButton} >
      <form className="px-5 py-3 relative" onSubmit={submitUpdate} >

        {(idUltimaCategoriaEliminada === dataUpdate.id) &&
          <div className="bg-black/20 absolute top-0 right-0 left-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-[2px]" >
            <h1 className="text-danger text-[30px] font-bold" >ELIMINADO</h1>
          </div>
        }

        <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
          <span className="me-3" >INFORMACIÓN</span>
          <button
            type="button"
            className="disabled:cursor-not-allowed"
            disabled={loadingData}
            onClick={() => { setEditMode(s => !s) }}
          >
            {!loadingData && <FaEdit />}
            {loadingData && <AiOutlineLoading className="ms-2 animate-spin" />}
          </button>
        </div>
        <InputText
          handleInputChange={handleInputChange}
          placeholder="*Nombre:"
          name="name"
          maxLenght={20}
          value={data.name}
          disabled={!editMode || loadingData}
        />
        <InputTextarea
          handleInputChange={handleInputChange}
          placeholder="Detalle:"
          name="details"
          value={data.details}
          disabled={!editMode || loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color='success' className="me-3" disabled={!editMode || loadingData} loading={loadingData} spinner />
          <Button label="Cancelar" color='danger' disabled={!editMode || loadingData} loading={loadingData} onClick={cancelUpdate} />
          {/* {editMode && <button
            onClick={deleteCategory}
            type="button"
            disabled={!editMode || loadingData}
            className="bg-warning bg-opacity-80 flex justify-center items-center text-white rounded-full w-7 h-7 ms-auto hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed">
            {loadingData ?
              <AiOutlineLoading className="animate-spin" />
              :
              <BsFillTrashFill />
            }
          </button>} */}
        </div>
      </form>
    </Windows>
  );
}