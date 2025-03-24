import { FaCheckCircle } from "react-icons/fa";
import logos from "../../../../assets/logos";
import { Producto } from "../../../../interface";
import { useState } from "react";


interface ProductoCardProp{
    producto: Producto
}


export default function ProductoCard({producto}: ProductoCardProp) {

    const [check, setCheck] = useState(false);


  return (
    <div className="w-[200px] h-[250px] mb-5 border border-secondary rounded overflow-hidden relative">

        <div 
            className="w-[40px] h-[40px] border-2 border-success absolute top-1 right-1 rounded cursor-pointer bg-white"
            onClick={() => {setCheck(s => !s)}}
        >
            {check&&(
                <div className="h-full w-full flex justify-center items-center text-[22px] text-success" >
                    <FaCheckCircle />
                </div>
            )}
        </div>

        <div className="flex justify-center" >
            <img src={ producto.imagen || logos.logoNoImage } alt={producto.nombre} className="h-[150px]"/>
        </div>

        <div className=" flex items-center flex-col h-[100px] bg-secondary text-white cursor-pointer">
            <div className="uppercase text-center p-2" >{producto.nombre}</div>
            <div className="bg-success w-full mt-auto flex justify-center text-black" > 1250 Bs. </div>
        </div>
    </div>
  );
}