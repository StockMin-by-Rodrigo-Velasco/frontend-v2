import { useDispatch, useSelector } from 'react-redux';
import { InputText, InputTextarea } from '../../../../components/Input';
import Windows from '../../../../components/Windows';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useForm } from '../../../../hooks';
import { CreateClienteVentaDto } from '../../../../interface';
import { ButtonColors, ButtonSubmit } from '../../../../components/Buttons';
import { FormEvent } from 'react';
import { createClienteVentaAPI } from '../../../../redux/ventas/ventasThunk';


interface CreateClienteVentasWindowsProp {
    closeButton: () => void;
}

export default function CreateClienteVentasWindows({ closeButton }: CreateClienteVentasWindowsProp) {
    const dispatch = useDispatch<AppDispatch>();

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id: sucursalId } = useSelector((s: RootState) => s.Sucursal);

    const initialStateForm: CreateClienteVentaDto = { sucursalId, codigo: '', nombre: '', apellido: '', contacto: '', direccion: '' };

    const { data, handleInputChange } = useForm<CreateClienteVentaDto>(initialStateForm);

    const submitCreateCliente = (e: FormEvent) => {
        e.preventDefault();
        dispatch(createClienteVentaAPI(data));
    }


    return (

        <Windows tittle='Registrar nuevo cliente' closeButton={closeButton}>
            <form className="px-5 py-3 relative w-[400px]" onSubmit={submitCreateCliente} >

                <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
                    <span className="me-3" >INFORMACIÓN</span>
                </div>
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Codigo/CI:"
                    name="codigo"
                    value={data.codigo}
                    disabled={loadingData}
                    required
                />
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
                    placeholder="Apellido:"
                    name="apellido"
                    value={data.apellido}
                    disabled={loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Contacto: *"
                    name="contacto"
                    value={data.contacto as string}
                    disabled={loadingData}
                />
                <InputTextarea
                    handleInputChange={handleInputChange}
                    placeholder="Direccion: *"
                    name="direccion"
                    value={data.direccion as string}
                    disabled={loadingData}
                />

                <div className="flex mt-3 justify-center" >
                    <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={loadingData} loading={loadingData} spinner />
                </div>
            </form>
        </Windows>


    );
}