import { useDispatch, useSelector } from 'react-redux';
import { InputText, InputTextarea } from '../../../../components/Input';
import Windows from '../../../../components/Windows';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useForm } from '../../../../hooks';
import { ClienteVenta, UpdateClienteVentaDto } from '../../../../interface';
import { ButtonColors, ButtonSubmit } from '../../../../components/Buttons';
import { FormEvent, useState } from 'react';
import { updateClienteVentaAPI } from '../../../../redux/ventas/ventasThunk';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';


interface UpdateClienteVentasWindowsProp {
    closeButton: () => void;
    cliente: ClienteVenta
}

export default function UpdateClienteVentasWindows({ closeButton, cliente }: UpdateClienteVentasWindowsProp) {
    const dispatch = useDispatch<AppDispatch>();

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id: sucursalId } = useSelector((s: RootState) => s.Sucursal);

    const [editMode, setEditMode] = useState(false);

    const initialStateForm: UpdateClienteVentaDto = {
        sucursalId,
        clienteId: cliente.id,
        codigo: cliente.codigo,
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        contacto: cliente.codigo,
        direccion: cliente.direccion
    };

    const { data, handleInputChange } = useForm<UpdateClienteVentaDto>(initialStateForm);

    const submitCreateCliente = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateClienteVentaAPI(data, "LOADING-DATA-COMPLETE"));
    }


    return (

        <Windows tittle='Datos de cliente' closeButton={closeButton}>
            <form className="px-5 py-3 relative w-[400px]" onSubmit={submitCreateCliente} >

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
                    placeholder="Codigo/CI:"
                    name="codigo"
                    value={data.codigo as string}
                    disabled={!editMode||loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Nombre:"
                    name="nombre"
                    value={data.nombre as string}
                    disabled={!editMode||loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Apellido:"
                    name="apellido"
                    value={data.apellido as string}
                    disabled={!editMode||loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Contacto: *"
                    name="contacto"
                    value={data.contacto as string}
                    disabled={!editMode||loadingData}
                />
                <InputTextarea
                    handleInputChange={handleInputChange}
                    placeholder="Direccion: *"
                    name="direccion"
                    value={data.direccion as string}
                    disabled={!editMode||loadingData}
                />

                <div className="flex mt-3 justify-center" >
                    <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={loadingData} loading={loadingData} spinner />
                </div>
            </form>
        </Windows>


    );
}