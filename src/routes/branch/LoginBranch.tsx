import { FormEvent, useEffect } from 'react';
import { useForm } from '../../hooks';
import { InputLoginPassword, InputLoginText } from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Notification } from '../../components/Notification';
import { LoginBranchDto } from '../../interface';
import { loginBranchAPI, getBranchModuleDataAPI } from '../../redux/branch/branchThunk';
import { useNavigate } from 'react-router';
import logos from '../../assets/logos';
import LoadingApplication from '../../components/LoadingApplication';
import { AiOutlineLoading } from 'react-icons/ai';

export default function LoginBranch() {

    const formulario: LoginBranchDto = { code: '', password: '' }
    const dispatch = useDispatch<AppDispatch>();
    const { showNotification } = useSelector((s: RootState) => s.Notification);
    const { loadingData, loadingApplication } = useSelector((s: RootState) => s.Aplication);
    const { id: branchId } = useSelector((s: RootState) => s.Branch);
    const navigate = useNavigate();

    const { data, handleInputChange } = useForm<LoginBranchDto>(formulario);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginBranchAPI(data, navigate));
    }

    useEffect(() => {
        if (branchId === '') dispatch(getBranchModuleDataAPI(navigate));
    }, [])

    return (
        <div>
            {showNotification && <Notification />}
            {loadingApplication && <LoadingApplication />}

            <div className="w-full h-screen bg-light flex items-center justify-center" >
                <div className="p-10 rounded-[20px] bg-white flex flex-col items-center justify-center" >
                    <img src={logos.logoVertical} alt="logo-vertical" width={'400px'} />

                    <form className='mt-10' onSubmit={onSubmit}>
                        <InputLoginText
                            handleInputChange={handleInputChange}
                            name='code'
                            placeholder='Ingrese el codigo de su sucursal'
                            value={data.code}
                            className='w-96'
                            required={true}
                        />

                        <InputLoginPassword
                            handleInputChange={handleInputChange}
                            name='password'
                            placeholder='Ingrese su contraseña'
                            value={data.password}
                            className='w-96'
                            required={true}
                        />
                        <div className='flex justify-center items-center mt-6' >
                            <button
                                className="bg-primary bg-opacity-80 text-white px-5 py-1 rounded-full hover:bg-opacity-100 flex items-center disabled:cursor-no-drop disabled:bg-opacity-70"
                                type='submit'
                                disabled={loadingData}
                            >
                                Iniciar sesion
                                {loadingData &&
                                    <AiOutlineLoading className="ms-2 animate-spin h-[16px] w-[16px]" color="white" />
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}