import logos from "../../../../assets/logos";
import { ProductoTienda, UpdateProductoVentaDto } from "../../../../interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { MdShoppingCart } from "react-icons/md";
import { useState } from "react";
import { createProductoVentaAPI, updateProductoVentaAPI } from "../../../../redux/ventas/ventasThunk";
import { useForm } from "../../../../hooks";

import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";


interface ProductoCardProp {
    producto: ProductoTienda,
    checkProducto: (productoId: string) => void,
    setLista?:React.Dispatch<React.SetStateAction<ProductoTienda[]>>
}


export default function ProductoCard({ producto, checkProducto, setLista }: ProductoCardProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { opcionesVenta } = useSelector((s: RootState) => s.Ventas);
    const { id: sucursalId } = useSelector((s: RootState) => s.Sucursal);

    const dispatch = useDispatch<AppDispatch>();

    const [editPrecio, setEditPrecio] = useState(false);

    const { data: formPrecio, handleInputChange } = useForm<{ precio: string }>({precio: (producto.precio === '-')?'0': producto.precio});

    const createUpdatePrecio = () => {
        const newProducto = {
            almacenId: opcionesVenta.almacenId,
            productoId: producto.productoId,
            precioVentaId: opcionesVenta.precioVentaId,
            precio: formPrecio.precio,
            sucursalId,
            codigoProducto: producto.codigo,
        }

        if( producto.precio === '-' ){
            dispatch(createProductoVentaAPI(newProducto, setLista, "LOADING-DATA-COMPLETE"));
        }else{
            const updateProducto: UpdateProductoVentaDto = {
                id: producto.id,
                precio:formPrecio.precio,
                sucursalId,
                codigoProducto: producto.codigo
            }
            dispatch(updateProductoVentaAPI(updateProducto, setLista, "LOADING-DATA-COMPLETE"));
        }
    }

    return (
        <div className="w-[200px] h-[300px] m-[10px] transition-all duration-200 rounded overflow-hidden relative shadow-[0px_2px_5px_rgba(0,0,0,0.3)]
                    hover:w-[210px] hover:h-[310px] hover:m-[5px] hover:shadow-[0px_5px_10px_rgba(0,0,0,0.3)]">


            <div className="flex justify-center" >
                <img src={producto.imagen || logos.logoNoImage} alt={producto.nombre} className="h-[120px]" />
            </div>

            <div className="absolute right-1 top-1 rounded-full bg-warning text-[14px] px-2" >
                {producto.cantidad} <span>{producto.UnidadMedida.abreviatura.toLocaleUpperCase()}</span>
            </div>

            <div className="flex flex-col p-2">
                <p className="uppercase font-bold">{producto.nombre}</p>
                <p className="uppercase text-[12px] text-secondary leading-none">{producto.codigo}</p>
                <p className="text-[14px] mt-1" >{producto.descripcion}</p>
            </div>

            <div className="font-bold absolute bottom-[36px] left-2" >

                {editPrecio?
                    <div className="font-normal mb-1 flex items-center">
                        <input
                            className="border border-secondary rounded-s-md w-[80px] focus:outline-none text-[12px] px-1"
                            type="number"
                            name="precio"
                            step="0.001"
                            onChange={handleInputChange}
                            value={formPrecio.precio}
                        />
                        <div className="border border-secondary bg-secondary text-white rounded-e-md text-[12px] px-1" >
                            {opcionesVenta.TipoMonedaVenta.abreviatura.toLocaleUpperCase()}
                        </div>

                        {loadingData ?
                            <span>
                                <AiOutlineLoading className="ms-2 animate-spin"/>
                            </span>
                            :
                            <>
                                <button
                                    type="button"
                                    onClick={createUpdatePrecio}
                                    className="bg-success ms-1 rounded-full h-[18px] w-[18px] text-[14px] text-white flex items-center justify-center" >
                                    <IoMdCheckmark />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setEditPrecio(false) }}
                                    className="bg-danger ms-1 rounded-full h-[18px] w-[18px] text-[14px] text-white flex items-center justify-center" >
                                    <IoClose />
                                </button>
                            </>
                        }
                    </div>
                    :
                    <>
                        {producto.precio === '-' ?
                            <button
                                type="button"
                                onClick={() => { setEditPrecio(true) }}
                                className="font-normal text-[12px] bg-success/70 hover:bg-success text-white px-2 rounded-full"
                            >Agregar precio
                            </button>
                            :
                            <div className="flex" >
                                {producto.precio}
                                <span className="font-medium ms-1" >{opcionesVenta.TipoMonedaVenta.abreviatura.toLocaleUpperCase()} </span>
                                <button 
                                    type="button" 
                                    className="text-secondary/80 ms-2 text-[14px] hover:text-secondary"
                                    onClick={() => {setEditPrecio(true)}}
                                    ><FaEdit/>
                                </button>
                            </div>
                        }
                    </>
                }
            </div>
            <button
                disabled={producto.precio === '-'}
                type="button"
                className={` ${producto.check ? 'bg-primary text-white' : 'text-primary'} 
                        border-2 border-primary flex justify-center items-center absolute bottom-0 right-0 left-0 m-2 rounded-lg cursor-pointer
                        disabled:border-secondary disabled:bg-secondary disabled:text-white disabled:cursor-not-allowed`}
                onClick={() => { checkProducto(producto.productoId) }}
            >
                {producto.check ? "EN CARRITO" : "AGREGAR"} <MdShoppingCart className="ms-2" />
            </button>
        </div>
    );
}