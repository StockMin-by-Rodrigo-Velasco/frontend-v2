import { useState } from "react";

interface FormInterface<T extends object> {
    data: T;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    resetData: () => void
}


/**
 * 
 * @param initialValue - Solo se admiten objetos con un tipado dinamico. Ej: initialValue&lt;Usuario&gt;
 * 
 * @returns Devuelve un objeto con los siguientes datos
 *  - `data`: El initialValue con los datos modificados. 
 *  - `handleInputChange`: Funcion que trabaja en el atributo onChange del input.
 *  - `resetData`: Funcion reinicia la data al estado inicial. 
 * 
 * @example
 * ```tsx
 * interface FormInterface {name:string, edad: number};
 * const formulario = useForm<FormInterface>({name:'Rodrigo', edad: 29});
 * ```
*/
export function useForm<T extends object>( obj: T ): FormInterface<T>
{
    const [data, setData] = useState(obj);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setData({...data, [name]: value});
    }

    const resetData = () => {
        setData(obj);
    }


    return {data, handleInputChange, resetData}
}