import { FormEvent } from 'react';
import logoVertical from '../../assets/vertical.png'
import { useForm } from '../../hooks';
import { InputLoginPassword, InputLoginText } from '../../components/Input';
import { Button } from '../../components/Button';
import { InfoNotification } from '../../components/Notification';

interface FormularioInterface {
    nit: string;
    password: string;
}

export default function Sucursal() {

    const formulario: FormularioInterface = { nit:'', password:''}
    const {data, handleInputChange} = useForm<FormularioInterface>(formulario);


    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(data)
    }
    return (
        <div>

            <InfoNotification 
                tittle='Titulo' 
                description='Lorem Ipsum is simply dummy text of the.' 
            />

            <div className="w-full h-screen bg-primary-1 flex items-center justify-center " >
                <div className="p-10 rounded-[20px] bg-white flex flex-col items-center justify-center" >
                    <img src={logoVertical} alt="logo-vertical" width={'400px'} />

                    <form className='mt-10' onSubmit={ onSubmit }>
                        <InputLoginText
                            handleInputChange={ handleInputChange } 
                            name='nit'
                            placeholder='Ingrese el nit de su sucursal' 
                            value={data.nit}
                            width='w-96'
                            required={true}
                        />

                        <InputLoginPassword 
                            handleInputChange={ handleInputChange } 
                            name='password'
                            placeholder='Ingrese su contraseña' 
                            value={data.password}
                            width='w-96'
                            required={true}
                            />
                        <div className='flex justify-center items-center mt-6' >
                            <Button label='Iniciar sesion' type={'submit'}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}