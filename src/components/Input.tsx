import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


interface InputProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  placeholder: string,
  value: string,
  required?:boolean,
  disabled?:boolean,
  className?:string
}

function InputText({ handleInputChange, value, name, placeholder, required=false, disabled=false, className='' }:InputProps){
  return(

    <div className = {`${className} relative mt-6`} >
      <input 
        className = {`w-full focus:outline-none rounded-t border-b-2 border-primary focus:border-info peer disabled:bg-light/80 disabled:cursor-not-allowed disabled:text-black/70`}
        type="text" 
        onChange={ handleInputChange }
        name={name}
        id={name}
        value={value}
        required={required}
        disabled={disabled}
      />
      <label
        className={ value === '' ?
          "absolute text-secondary left-0 top-0  transition-all peer-focus:text-secondary peer-focus:top-[-20px] peer-focus:text-[12px] cursor-text"
          :
          "absolute left-0 text-secondary top-[-20px] text-[12px]"
        }
        htmlFor={name}> {placeholder}
      </label>
    </div>
    
  )
}

function InputPassword({ handleInputChange, value, name, placeholder, required=false, disabled=false, className='' }:InputProps){
  return(

    <div className = {`${className} relative mt-6`} >
      <input 
        className = {`w-full focus:outline-none rounded-t border-b-2 border-primary focus:border-info peer disabled:bg-light/80 disabled:cursor-not-allowed disabled:text-black/70`}
        type="password" 
        onChange={ handleInputChange }
        name={name}
        id={name}
        value={value}
        required={required}
        disabled={disabled}
      />
      <label
        className={ value === '' ?
          "absolute text-secondary left-0 top-0  transition-all peer-focus:text-secondary peer-focus:top-[-20px] peer-focus:text-[12px] cursor-text"
          :
          "absolute left-0 text-secondary top-[-20px] text-[12px]"
        }
        htmlFor={name}> {placeholder}
      </label>
    </div>
    
  )
}

function InputLoginPassword({ handleInputChange, value, name, placeholder, required=false, disabled=false, className='' }: InputProps ) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className = {`${className} relative mt-6`}>
      <input
        id="inputFormPass"
        name={name}
        className="pb-2 w-full focus:outline-none border-b-2 border-primary focus:border-info peer disabled:cursor-not-allowed" 
        type={ showPass? 'text':'password' }
        onChange={ handleInputChange }
        value={value}
        autoComplete="off"
        required={required}
        disabled={disabled}
        />

      <label
        className={ value === '' ?
          "absolute text-secondary left-0 top-0  transition-all peer-focus:text-info peer-focus:top-[-25px] peer-focus:text-[14px] cursor-text"
          :
          "absolute left-0 text-info top-[-25px] text-[14px]"
        }
        htmlFor="inputFormPass"> {placeholder}
      </label>
      
      {showPass?
        <div> <FaRegEye className="absolute right-2 top-0 text-primary text-2xl cursor-pointer" onClick={() => { setShowPass( !showPass ) }}/> </div>
        :
        <div> <FaRegEyeSlash className="absolute right-2 top-0 text-primary text-2xl cursor-pointer" onClick={() => { setShowPass( !showPass ) }}/> </div>
      }
      
    </div>
  );
}

function InputLoginText({ handleInputChange, value, name, placeholder, required=false, disabled=false, className='' }: InputProps ) {

  return (
    <div className = {`${className} relative mt-6`}>
      <input
        id="inputFormText"
        name={name}
        className="pb-2 w-full focus:outline-none border-b-2 border-primary focus:border-info peer disabled:cursor-not-allowed" 
        type= 'text'
        onChange={ handleInputChange }
        value={value}
        autoComplete="off"
        required={required}
        disabled={disabled}
        />

      <label
        className={ value === '' ?
          "absolute text-secondary left-0 top-0  transition-all peer-focus:text-info peer-focus:top-[-25px] peer-focus:text-[14px] cursor-text"
          :
          "absolute left-0 text-info top-[-25px] text-[14px]"
        }
        htmlFor="inputFormText"> {placeholder}
      </label>
      
    </div>
  );
}

export { InputLoginPassword, InputLoginText, InputText, InputPassword }