import { useDispatch, useSelector } from 'react-redux';
import { InputText, InputTextarea } from '../../../../components/Input';
import Windows from '../../../../components/Windows';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useForm } from '../../../../hooks';
import { ButtonSubmit } from '../../../../components/Buttons';
import { FormEvent, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { Customer, UpdateCustomerDto } from '../../../../interfaces';
import { updateCustomerAPI } from '../../../../redux/sales/salesThunk';


interface UpdateCustomerProp {
    closeButton: () => void;
    customer: Customer
}

export default function UpdateCustomer({ closeButton, customer }: UpdateCustomerProp) {
    const dispatch = useDispatch<AppDispatch>();

    const { loadingData } = useSelector((s: RootState) => s.Aplication);

    const [editMode, setEditMode] = useState(false);

    const { data: updateCustomerDto, handleInputChange } = useForm<UpdateCustomerDto>(customer);

    const submitCreateCliente = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateCustomerAPI(updateCustomerDto));
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
                    name="code"
                    value={updateCustomerDto.code as string}
                    disabled={!editMode||loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Nombre:"
                    name="name"
                    value={updateCustomerDto.name as string}
                    disabled={!editMode||loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Apellido:"
                    name="lasName"
                    value={updateCustomerDto.lasName as string}
                    disabled={!editMode||loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Contacto: *"
                    name="contact"
                    value={updateCustomerDto.contact as string}
                    disabled={!editMode||loadingData}
                />
                <InputTextarea
                    handleInputChange={handleInputChange}
                    placeholder="Direccion: *"
                    name="address"
                    value={updateCustomerDto.address as string}
                    disabled={!editMode||loadingData}
                />

                <div className="flex mt-3 justify-center" >
                    <ButtonSubmit label="Guardar" color='success' className="me-3" disabled={loadingData} loading={loadingData} spinner />
                </div>
            </form>
        </Windows>


    );
}