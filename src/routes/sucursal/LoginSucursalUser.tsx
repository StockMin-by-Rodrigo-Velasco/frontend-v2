import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { FormEvent } from "react";
import { loginSucursalUserAPI } from "../../redux/sucursal/sucursalThunk";
import { useForm } from "../../hooks";
import { MdError } from "react-icons/md";

export default function LoginSucursalUser() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userSelected } = useSelector((s:RootState) => s.Sucursal);
  const { description } = useSelector((s:RootState) => s.Notification);
  const { loadingData } = useSelector((s:RootState) => s.Aplication);

  const { data, handleInputChange } = useForm<{password:string}>({password:''});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataLogin = {id: userSelected.id, sucursalId: userSelected.sucursalId, password: data.password};
    dispatch(loginSucursalUserAPI(dataLogin, navigate));
  }
  return (
    <div className="absolute bg-black bg-opacity-80 w-full h-full flex items-center justify-center" >

      <form 
      className="text-white flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
      >

        <Link to='/users' >
          <IoCloseSharp className="text-5xl absolute top-16 right-16"/>
        </Link>

        <h1 className="font-bold text-3xl" >Ingresa tu contraseña:</h1>
        <input 
          className={`bg-transparent w-96 mt-10 mb-2 text-3xl border-4 p-3 ${description? 'border-danger':'border-white'} rounded-lg focus:outline-none disabled:border-secondary-2 disabled:cursor-not-allowed`}
          onChange={handleInputChange}
          value={data.password}
          name="password"
          type="password"
          autoFocus
          disabled={loadingData}
        />
        <span className={`bg-danger px-2 rounded-lg flex items-center ${!description&& 'opacity-0'}`}> <MdError className="me-2" />{description}</span>
      </form>
    </div>
  );
}