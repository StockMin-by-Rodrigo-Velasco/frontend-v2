import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


interface InputProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  placeholder: string,
  value: string,
  required?:boolean,
  disabled?:boolean,
  width?:string
}

/**
 * `width`: 'w-96' para ocupar todo el espacio. 
 * 
 */

function InputLoginPassword({ handleInputChange, value, name, placeholder, required=false, disabled=false, width='' }: InputProps ) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className = {`relative mt-6 ${width} `}>
      <input
        id="inputFormPass"
        name={name}
        className="pb-2 w-full focus:outline-none border-b-2 border-primary-3 focus:border-primary-2 peer disabled:cursor-not-allowed" 
        type={ showPass? 'text':'password' }
        onChange={ handleInputChange }
        value={value}
        autoComplete="off"
        required={required}
        disabled={disabled}
        />

      <label
        className={ value === '' ?
          "absolute text-secondary-2 left-0 top-0  transition-all peer-focus:text-primary-2 peer-focus:top-[-25px] peer-focus:text-[14px] cursor-text"
          :
          "absolute left-0 text-primary-2 top-[-25px] text-[14px]"
        }
        htmlFor="inputFormPass"> {placeholder}
      </label>
      
      {showPass?
        <div> <FaRegEye className="absolute right-2 top-0 text-primary-3 text-2xl cursor-pointer" onClick={() => { setShowPass( !showPass ) }}/> </div>
        :
        <div> <FaRegEyeSlash className="absolute right-2 top-0 text-primary-3 text-2xl cursor-pointer" onClick={() => { setShowPass( !showPass ) }}/> </div>
      }
      
    </div>
  );
}

function InputLoginText({ handleInputChange, value, name, placeholder, required=false, disabled=false, width }: InputProps ) {

  return (
    <div className = {`relative mt-6 ${width||''} `}>
      <input
        id="inputFormText"
        name={name}
        className="pb-2 w-full focus:outline-none border-b-2 border-primary-3 focus:border-primary-2 peer disabled:cursor-not-allowed" 
        type= 'text'
        onChange={ handleInputChange }
        value={value}
        autoComplete="off"
        required={required}
        disabled={disabled}
        />

      <label
        className={ value === '' ?
          "absolute text-secondary-2 left-0 top-0  transition-all peer-focus:text-primary-2 peer-focus:top-[-25px] peer-focus:text-[14px] cursor-text"
          :
          "absolute left-0 text-primary-2 top-[-25px] text-[14px]"
        }
        htmlFor="inputFormText"> {placeholder}
      </label>
      
    </div>
  );
}

export { InputLoginPassword, InputLoginText }