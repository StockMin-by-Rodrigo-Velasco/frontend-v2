import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { FormEvent, useState } from "react";
import { deleteMarcaAPI, updateMarcaAPI } from "../../../../redux/products/productosThunk";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { InputText, InputTextarea } from "../../../../components/Input";
import { Button, ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import { BsFillTrashFill } from "react-icons/bs";
import { hideNotification, showNotificationWarning } from "../../../../redux/notification/notificationSlice";

interface DataMarcaInterface {
  id: string;
  sucursalId: string;
  nombre: string;
  origen: string;
  deleted: boolean;
}
interface UpdateMarcaProps {
  closeButton: () => void;
  dataUpdate: DataMarcaInterface
}

export default function UpdateBrand({ dataUpdate, closeButton }: UpdateMarcaProps) {
  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { idUltimaMarcaEliminada } = useSelector((s: RootState) => s.Productos);
  const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
  const dispatch = useDispatch<AppDispatch>()
  const { data, handleInputChange, resetData } = useForm<DataMarcaInterface>(dataUpdate);
  const [editMode, setEditMode] = useState(false);

  const cancelUpdate = () => {
    setEditMode(false);
    resetData();
  }

  const submitUpdate = (e: FormEvent) => {
    e.preventDefault();
    const { deleted, ...res } = data;
    dispatch(updateMarcaAPI(res, "LOADING-DATA-COMPLETE"));
  }

  const deleteMarca = () => {
    if (typeNotification === 'WARNING' && showNotification) {
      dispatch(deleteMarcaAPI(dataUpdate.id, "LOADING-DATA-COMPLETE"));
      dispatch(hideNotification());
    } else {
      dispatch(showNotificationWarning({ tittle: 'Eliminar marca', description: 'Si deseas continuar vuelve a presionar el botón de eliminación, caso contrario cierra este mensaje' }))
    }
  }


  return (
    <Windows tittle='Detalles de marca' closeButton={closeButton} >
      <form className="px-5 py-3 relative" onSubmit={submitUpdate} >

        {(idUltimaMarcaEliminada === dataUpdate.id) &&
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
          name="nombre"
          value={data.nombre}
          maxLenght={20}
          disabled={!editMode || loadingData}
        />
        <InputTextarea
          handleInputChange={handleInputChange}
          placeholder="Origen:"
          name="origen"
          value={data.origen}
          disabled={!editMode || loadingData}
        />

        <div className="flex mt-3 justify-center" >
          <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={!editMode} loading={loadingData} spinner />
          <Button label="Cancelar" color={ButtonColors.danger} disabled={!editMode} loading={loadingData} onClick={cancelUpdate} />
          {/* {editMode && <button
            onClick={deleteMarca}
            type="button"
            disabled={!editMode || loadingData}
            // disabled
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