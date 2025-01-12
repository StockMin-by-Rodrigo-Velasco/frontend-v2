import { useSelector } from "react-redux";
import { RootState } from '../redux/store';
import { MdOutlineError } from "react-icons/md";

function ErrorAlert() {
  const { msg, show } = useSelector( (state: RootState) => state.Alerts );

  return (
    <div className={`absolute top-3 right-3 bg-danger bg-opacity-25 py-4 pr-4 rounded-tr-[10px] rounded-br-[10px] max-w-[400px] border-l-danger border-l-4 flex flex-col${ show? 'opacity-100':'opacity-0 hidden' }`} >
      <div className="flex justify-center items-center p-4" >
        <MdOutlineError className="text-danger text-[60px]"/>
      </div>
      <div>
        <h1 className='font-bold' >Error</h1>
        <p>{ msg }</p>
      </div>
    </div>
  );
}


export { ErrorAlert }