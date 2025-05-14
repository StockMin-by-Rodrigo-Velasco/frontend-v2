import { useDispatch, useSelector } from 'react-redux';
import { InputText, InputTextarea } from '../../../../components/Input';
import Windows from '../../../../components/Windows';
import { AppDispatch, RootState } from '../../../../redux/store';
import { useForm } from '../../../../hooks';
import { ButtonSubmit } from '../../../../components/Buttons';
import { FormEvent } from 'react';
import { CreateCustomerDto } from '../../../../interfaces';
import { createCustomerAPI } from '../../../../redux/sales/salesThunk';

interface CreateCustomerProp {
    closeButton: () => void;
}

export default function CreateCustomer({ closeButton }: CreateCustomerProp) {
    const dispatch = useDispatch<AppDispatch>();

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id: branchId } = useSelector((s: RootState) => s.Branch);

    const { data: createCustomerDto, handleInputChange } = useForm<CreateCustomerDto>({
        branchId, 
        code:'', 
        name:'', 
        lasName:'', 
        address:'', 
        contact:''
    });

    const createCustomer = (e: FormEvent) => {
        e.preventDefault();
        dispatch(createCustomerAPI(createCustomerDto));
    }
    return (

        <Windows tittle='Registrar nuevo cliente' closeButton={closeButton}>
            <form className="px-5 py-3 relative w-[400px]" onSubmit={createCustomer} >

                <div className="mb-8 flex items-center justify-center border-b-[1px] border-secondary text-secondary">
                    <span className="me-3" >INFORMACIÓN</span>
                </div>
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Codigo/CI:"
                    name="code"
                    value={createCustomerDto.code}
                    disabled={loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Nombre:"
                    name="name"
                    value={createCustomerDto.name}
                    disabled={loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Apellido:"
                    name="lasName"
                    value={createCustomerDto.lasName}
                    disabled={loadingData}
                    required
                />
                <InputText
                    handleInputChange={handleInputChange}
                    placeholder="Contacto: *"
                    name="contact"
                    value={createCustomerDto.contact as string}
                    disabled={loadingData}
                />
                <InputTextarea
                    handleInputChange={handleInputChange}
                    placeholder="Direccion: *"
                    name="address"
                    value={createCustomerDto.address as string}
                    disabled={loadingData}
                />

                <div className="flex mt-3 justify-center" >
                    <ButtonSubmit label="Guardar" color='success' className="me-3" disabled={loadingData} loading={loadingData} spinner />
                </div>
            </form>
        </Windows>


    );
}