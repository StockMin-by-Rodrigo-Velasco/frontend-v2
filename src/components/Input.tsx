import { useState } from "react";
import { FaCloudUploadAlt, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";


interface InputProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
  name: string,
  placeholder: string,
  value: string,
  required?:boolean,
  disabled?:boolean,
  className?:string,
  maxLenght?: number,
}

interface InputBlockProps {
  name: string,
  placeholder: string,
  value: string,
  className?:string
  uppercase?: boolean
}

interface InputFileProps {
  setFileValue: (file:File|undefined) => void, // Funcion para obtener el archivo
  name: string,
  imageDefault: string,
  placeholder: string,
  required?:boolean,
  disabled?:boolean,
  className?:string
}

interface InputSelectProps extends InputProps {
  options: {name: string, value: string}[],
  optionDefault?: string
}

const InputFileImage = ({setFileValue, name, imageDefault, placeholder, required=false, disabled=false }:InputFileProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageNamePreview, setImageNamePreview] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtener el primer archivo seleccionado
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // Guardar la imagen en el estado
      };
      reader.readAsDataURL(file); // Convertir la imagen a base64 para previsualizarla
      setImageNamePreview(file?.name);
      setFileValue(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg">
      <input
        id={name}
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleFileChange}
        className="hidden"
        required={required}
        disabled={disabled}
      />     
      <img
        src={imagePreview || imageDefault}
        alt="Preview"
        className="object-cover rounded-lg h-[200px]"
      />
      <label 
        className={`${disabled? 'cursor-not-allowed bg-opacity-50':'cursor-pointer'} text-white bg-secondary w-full rounded-full mt-2 flex items-center justify-center text-[14px] `}
        htmlFor={name}
      > 
        <span className="me-2 text-[18px]">{disabled?<MdBlockFlipped/>:<FaCloudUploadAlt/>}</span>{placeholder}
      </label>
      <span className="text-secondary text-[12px]" >{imageNamePreview}</span>
    </div>
  );
};

function InputDateSearch({handleInputChange, value, name, placeholder, required=false, disabled=false, className=''}:InputProps){
  return(
    <div className = {`${className} flex items-center rounded-md border-[1px] border-secondary px-2 disabled:bg-light/80 disabled:cursor-not-allowed`}>
      <label 
        htmlFor={name}
        className="text-secondary me-2"
      >
        {placeholder}
      </label>
      <input 
        className="text-secondary rounded-lg focus:outline-none bg-secondary-1"
        type="date"
        onChange={handleInputChange}
        value={value}
        name={name}
        id={name}
        required={required}
        disabled={disabled}
      />
    </div>
  )
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

function InputSelectSearch({handleInputChange, value, name, placeholder, required=false, disabled=false, className='', options, optionDefault}:InputSelectProps) {
  return(
    <div className = {`${className} border-[1px] rounded-lg border-secondary text-secondary flex justify-center items-center px-2 text-[14px]`} >
      <label htmlFor={name} className="text-secondary/70 me-1" >{placeholder}</label>
      <select
        className='rounded-lg focus:outline-none focus:bg-secondary-1'
        name={name}
        id={name}
        onChange={handleInputChange}
        // defaultValue={value}
        value={value}
        required={required}
        disabled={disabled}
      >
        {optionDefault&&  <option value='' >{optionDefault}</option>}
        {options.map(o => (
          <option key={o.value} value={o.value} >{o.name.toUpperCase()}</option>
        ))}      
      </select>
    </div>
  )  
}

function InputText({ handleInputChange, value, name, placeholder, required=false, disabled=false, maxLenght, className='' }:InputProps){
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
        maxLength={maxLenght}
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

function InputNumber({ handleInputChange, value, name, placeholder, required=false, disabled=false, className='' }:InputProps){
  return(

    <div className = {`${className} relative mt-6`} >
      <input 
        className = {`ps-1 w-full focus:outline-none rounded-t border-b-2 border-primary focus:border-info peer disabled:bg-light/80 disabled:cursor-not-allowed disabled:text-black/70`}
        type="number" 
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

function InputTextBlock({ value, name, placeholder, className='', uppercase }:InputBlockProps){
  return(

    <div className = {`${className} relative mt-6`} >
      <input 
        className = {`${uppercase&& 'uppercase'} ps-1 w-full rounded-t border-b-2 border-secondary disabled:bg-secondary-1/30 disabled:text-black/70`}
        type="text" 
        onChange={ () => {} }
        name={name}
        id={name}
        value={value}
        disabled
      />
      <label
        className="absolute left-0 text-secondary top-[-20px] text-[12px]"
        htmlFor={name}> {placeholder}
      </label>
    </div>
  )
}

function InputSelect({handleInputChange, value, name, placeholder, required=false, disabled=false, className='', options, optionDefault}:InputSelectProps) {
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
        disabled={disabled || (options.length === 0)}
      >
        {options.length === 0 && <option value='' >Sin opciones</option>}
        {optionDefault&& <option value='' className="text-secondary" >{optionDefault}</option>}
        {options.map(o => (
          <option key={o.value} value={o.value} >{o.name.toUpperCase()}</option>
        ))}      
      </select>
      <label className="absolute left-0 text-secondary top-[-20px] text-[12px]" htmlFor={name}>{placeholder}</label>
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

function InputTextareaBlock({ value, name, placeholder, className='' }:InputBlockProps){
  return(

    <div className = {`${className} relative mt-6`} >
      <textarea 
        className = {`p-1 w-full  rounded-t border-b-2 border-secondary disabled:bg-secondary-1/30 disabled:text-black/70`}
        onChange={() => {}}
        name={name} 
        id={name}
        value={value}
        disabled
      ></textarea>
      <label
        className= "absolute left-0 text-secondary top-[-20px] text-[12px]"
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
  InputFileImage,
  InputSearch, 
  InputSelectSearch,
  InputDateSearch,
  InputLoginPassword, 
  InputLoginText,
  InputTextBlock,
  InputSelect, 
  InputTextarea,
  InputTextareaBlock,
  InputText, 
  InputNumber,
  InputPassword, 
}