import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";


interface InputProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
  name: string,
  placeholder: string,
  value: string,
  required?:boolean,
  disabled?:boolean,
  className?:string
}

interface InputSelectProps extends InputProps {
  options: {name: string, value: string}[],
}

function InputSearch({handleInputChange, value, name, placeholder, required=false, disabled=false, className=''}:InputProps){
  return(
    <div className = {`${className} flex items-center rounded-full border-[1px] border-primary px-2`}>
      <input 
        className="w-full focus:outline-none"
        type="search"
        onChange={handleInputChange}
        value={value}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      <label 
        htmlFor={name}
        className="text-primary cursor-text"
      >
        <IoSearch/>
      </label>
    </div>
  )
}

function InputText({ handleInputChange, value, name, placeholder, required=false, disabled=false, className='' }:InputProps){
  return(

    <div className = {`${className} relative mt-6`} >
      <input 
        className = {`ps-1 w-full focus:outline-none rounded-t border-b-2 border-primary focus:border-info peer disabled:bg-light/80 disabled:cursor-not-allowed disabled:text-black/70`}
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

function InputSelect({handleInputChange, value, name, placeholder, required=false, disabled=false, className='', options}:InputSelectProps) {
  return(
    <div className = {`${className} relative mt-6`} >
      <select
        className='border-[1px] border-secondary rounded-md focus:outline-none focus:bg-secondary-1 disabled:bg-light/80 disabled:cursor-not-allowed'
        name={name}
        id={name}
        onChange={handleInputChange}
        // defaultValue={value}
        value={value}
        required={required}
        disabled={disabled}
      >
        {options.map(o => (
          <option key={o.value} value={o.value} >{o.name.toUpperCase()}</option>
        ))}      
      </select>
      <label className="absolute left-0 text-secondary top-[-20px] text-[12px]"  htmlFor={name}>{placeholder}</label>
    </div>
  )  
}

function InputTextarea({ handleInputChange, value, name, placeholder, required=false, disabled=false, className='' }:InputProps){
  return(

    <div className = {`${className} relative mt-6`} >
      <textarea 
        className = {`p-1 w-full focus:outline-none rounded-t border-b-2 border-primary focus:border-info peer disabled:bg-light/80 disabled:cursor-not-allowed disabled:text-black/70`}
        onChange={ handleInputChange }
        name={name} 
        id={name}
        value={value}
        required={required}
        disabled={disabled}
      ></textarea>
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

export { 
  InputSearch, 
  InputLoginPassword, 
  InputLoginText,
  InputSelect, 
  InputTextarea,
  InputText, 
  InputPassword, 
}