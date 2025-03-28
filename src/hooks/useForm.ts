import { useState } from "react";

interface FormInterface<T extends object> {
    data: T;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        // console.log({...data, [name]: value});
        setData({...data, [name]: value});
    }

    const resetData = () => {
        setData(obj);
    }


    return {data, handleInputChange, resetData}
}

export function useFormArray<T>( array: T[])
{
    const [arrayData, setArrayData] = useState(array); //[{},{}]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        //El name debe venir como name:index ->  ej: nombre:0
        const { value, name } = e.target;
        const prop = name.split(':')[0]; // Nombre de la propiedad del objeto
        const index = parseInt(name.split(':')[1]); // Lugar del objeto en el array
        let newArray = arrayData;

        newArray[index] = {...newArray[index], [prop]:value };
        setArrayData([...newArray]);
    }

    const pushData = (data:T) => {
        setArrayData(s => [...s, data]);
    }

    const pushManyData = (data:T[]) => {
        setArrayData(s => [...s, ...data]);
    }

    const replaceData = (data:T[]) => {
        setArrayData([...data]);
    }

    const removeData = (index : number) => {
        const newArray = arrayData.filter((_,i) => i !== index);
        setArrayData([...newArray]);
    }

    const resetData = () => {
        setArrayData(array);
    }
    return {arrayData, handleInputChange, resetData, replaceData, pushData, pushManyData, removeData}
}