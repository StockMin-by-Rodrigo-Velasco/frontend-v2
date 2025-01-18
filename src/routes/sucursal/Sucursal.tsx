import { FormEvent } from 'react';
import logoVertical from '../../assets/vertical.png'
import { useForm } from '../../hooks';
import { InputLoginPassword, InputLoginText } from '../../components/Input';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
// import { showNotificationError, showNotificationInfo, showNotificationLoading, showNotificationSuccess, showNotificationWarning } from '../../redux/notificationSlice';
import { Notification } from '../../components/Notification';
import { SucursalLoginInterface } from '../../interface';
import { sucursalLoginAPI } from '../../redux/sucursal/sucursalThunk';

export default function Sucursal() {

    const formulario: SucursalLoginInterface = { nit:'', password:''}
    const {data, handleInputChange} = useForm<SucursalLoginInterface>(formulario);
    const dispatch = useDispatch<AppDispatch>();
    const { showNotification } = useSelector((s: RootState) => s.Notification)


    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch( sucursalLoginAPI( data ) );
    }
    return (
        <div>
            { showNotification&& <Notification/> }

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

                    {/* <div>
                        <button type="button" onClick={ () => { dispatch( showNotificationLoading( { tittle:'Loading', description: 'Una descripcion del loading' }))}}>Loading</button>
                        <button type="button" onClick={ () => { dispatch( showNotificationError( { tittle:'Error', description: 'Una descripcion del error' }))}}>Error</button>
                        <button type="button" onClick={ () => { dispatch( showNotificationSuccess( { tittle:'Success', description: 'Una descripcion del success' }))}}>Success</button>
                        <button type="button" onClick={ () => { dispatch( showNotificationInfo( { tittle:'Info', description: 'Una descripcion del info' }))}}>Info</button>
                        <button type="button" onClick={ () => { dispatch( showNotificationWarning( { tittle:'Warning', description: 'Una descripcion del warning' }))}}>Warning</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}