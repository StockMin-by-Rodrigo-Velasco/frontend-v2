import { FormEvent, useState } from "react";
import { InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from '../../../../hooks/useForm';
import { Button, ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { deleteCategoriaAPI, updateCategoriaAPI } from "../../../../redux/productos/productosThunk";
import { hideNotification, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
import { BsFillTrashFill } from "react-icons/bs";


interface DataCategoriaInterface {
  id: string;
  sucursalId: string;
  nombre: string;
  detalle: string;
  deleted: boolean;
}
interface UpdateCategoriaProps {
  closeButton: () => void;
  dataUpdate: DataCategoriaInterface
}

export default function UpdateCategoria({ dataUpdate, closeButton }: UpdateCategoriaProps) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { idUltimaCategoriaEliminada } = useSelector((s: RootState) => s.Productos);
  const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange, resetData } = useForm<DataCategoriaInterface>(dataUpdate);
  const [editMode, setEditMode] = useState(false);

  const cancelUpdate = () => {
    setEditMode(false);
    resetData();
  }

  const submitUpdate = (e: FormEvent) => {
    e.preventDefault();
    const { deleted, ...res } = data;
    dispatch(updateCategoriaAPI(res));
  }

  const deleteCategoria = () => {
    if (typeNotification === 'WARNING' && showNotification) {
      dispatch(deleteCategoriaAPI(dataUpdate.id));
      dispatch(hideNotification());
    } else {
      dispatch(showNotificationWarning({ tittle: 'Eliminar categoría', description: 'Si deseas continuar vuelve a presionar el botón de eliminación, caso contrario cierra este mensaje' }))
    }
  }


  return (
    <Windows tittle='Detalles de categoria' closeButton={closeButton} >
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
          placeholder="Nombre:"
          name="nombre"
          value={data.nombre}
          disabled={!editMode || loadingData}
        />
        <InputTextarea
          handleInputChange={handleInputChange}
          placeholder="Detalle:"
          name="detalle"
          value={data.detalle}
          disabled={!editMode || loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={!editMode || loadingData} loading={loadingData} spinner />
          <Button label="Cancelar" color={ButtonColors.danger} disabled={!editMode || loadingData} loading={loadingData} onClick={cancelUpdate} />
          {editMode && <button
            onClick={deleteCategoria}
            type="button"
            disabled={!editMode || loadingData}
            className="bg-warning bg-opacity-80 flex justify-center items-center text-white rounded-full w-7 h-7 ms-auto hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed">
            {loadingData ?
              <AiOutlineLoading className="animate-spin" />
              :
              <BsFillTrashFill />
            }
          </button>}
        </div>
      </form>
    </Windows>
  );
}