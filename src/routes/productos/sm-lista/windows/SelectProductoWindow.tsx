import { useDispatch, useSelector } from "react-redux";
import { InputSelect, InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { FormEvent, useState } from "react";
import { deleteProductoAPI, updateProductoAPI } from "../../../../redux/productos/productosThunk";
import { Button, ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import { BsFillTrashFill } from "react-icons/bs";
import { hideNotification, showNotificationWarning } from "../../../../redux/notification/notificationSlice";

interface ProductoInterface {
    id: string;
    sucursalId: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    activo: boolean;
    deleted: boolean;
    categoriaId: string;
    categoria?: string;
    marcaId: string;
    marca?: string;
    unidadMedidaId: string;
    unidadMedida?: string;
    createdAt: number;
    updatedAt: number;
}
interface ProductoSelectedWindowsPropInterface {
    producto: ProductoInterface,
    closeButton: () => void
}
interface FormUpdateProducto {
    codigo: string;
    nombre: string;
    descripcion: string;
    categoriaId: string;
    marcaId: string;
    unidadMedidaId: string;
}


export default function SelectProductoWindow({ producto, closeButton }: ProductoSelectedWindowsPropInterface) {
    const dateCreatedAt = new Date(producto.createdAt).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false});
    const dateUpdatedAt = new Date(producto.updatedAt).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false});

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
    const { idUltimoProductoEliminado, listaCategorias, listaMarcas, listaUnidadesMedida } = useSelector((s: RootState) => s.Productos);
    const dispatch = useDispatch<AppDispatch>();
    const { codigo, nombre, descripcion, categoriaId, marcaId, unidadMedidaId } = producto;
    const { data, handleInputChange, resetData } = useForm<FormUpdateProducto>({ codigo, nombre, descripcion, categoriaId, marcaId, unidadMedidaId });
    const [editMode, setEditMode] = useState(false);

    const updateProducto = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateProductoAPI({id: producto.id, ...data}))        
    }
    const cancelUpdateProducto = () => {
        resetData();
        setEditMode(false);
    }

    const deleteProducto = () => {
        if( typeNotification === 'WARNING' && showNotification ){
            dispatch(deleteProductoAPI(producto.id));
            dispatch(hideNotification());
        }else{
            dispatch(showNotificationWarning({tittle: 'Eliminar producto', description: 'Si deseas continuar vuelve a presionar el botón de eliminación, caso contrario cierra este mensaje'}))
        }
    }

    return (
        <Windows tittle={producto.nombre} closeButton={closeButton} 
            footer={`Creación: ${dateCreatedAt} - Ultima actualización: ${dateUpdatedAt}`} 
        >
            <div className="p-4 flex relative">
                {(idUltimoProductoEliminado === producto.id)&&
                    <div className="bg-black/20 absolute top-0 right-0 left-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-[2px]" >
                        <h1 className="text-danger text-[50px] font-bold" >ELIMINADO</h1>
                    </div>
                }
                <div className="flex flex-col items-center border rounded-lg shadow-lg">
                    <img src={producto.imagen} alt={producto.nombre} width='300px' />
                </div>

                <div className="ms-3" >
                    <form className="flex flex-col" onSubmit={updateProducto} >
                        <div className="flex items-center text-center border-b-[1px] border-secondary mb-2 text-secondary">
                            <span className="me-3" >INFORMACIÓN</span>
                            <button
                                type="button"
                                className="disabled:cursor-not-allowed"
                                disabled={loadingData}
                                onClick={() => {setEditMode(s=> !s)}}
                            >
                                {!loadingData && <FaEdit />}
                                {loadingData && <AiOutlineLoading className="ms-2 animate-spin" />}
                            </button>
                        </div>
                        <div className="flex" >
                            <div>
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={data.codigo}
                                    name="codigo"
                                    placeholder="Codigo"
                                    disabled={!editMode}

                                />
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={data.nombre}
                                    name="nombre"
                                    placeholder="Nombre"
                                    disabled={!editMode}

                                />
                                <InputTextarea
                                    handleInputChange={handleInputChange}
                                    value={data.descripcion}
                                    name="descripcion"
                                    placeholder="Descripcion"
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="flex flex-col ms-3" >
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.categoriaId}
                                    name='categoriaId'
                                    placeholder="Categoria"
                                    options={listaCategorias.map(c => ({name: c.nombre, value: c.id}))}
                                    disabled={!editMode}
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.marcaId}
                                    name='marcaId'
                                    placeholder="Marca"
                                    options={listaMarcas.map(m => ({ name: m.nombre, value: m.id }))}
                                    disabled={!editMode}
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.unidadMedidaId}
                                    name='unidadMedidaId'
                                    placeholder="Unidad de medida"
                                    options={listaUnidadesMedida.map(m => ({ name: m.nombre, value: m.id }))}
                                    disabled={!editMode}
                                />
                            </div>
                        </div>

                        <div className="border-t-[1px] border-secondary mt-2 pt-2 flex" >
                            <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" disabled={!editMode} loading={loadingData} spinner/>
                            <Button label="Cancelar" color={ButtonColors.danger} disabled={!editMode} loading={loadingData} onClick={cancelUpdateProducto}/>
                            {editMode&& 
                            <button 
                                onClick={deleteProducto}
                                type="button"
                                disabled= {!editMode || loadingData}
                                // disabled
                                className="bg-warning bg-opacity-80 flex justify-center items-center text-white rounded-full w-7 h-7 ms-auto hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed"> 
                                {loadingData?
                                    <AiOutlineLoading className="animate-spin"/>
                                    :
                                    <BsFillTrashFill/> 
                                }
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </Windows>
    );
}