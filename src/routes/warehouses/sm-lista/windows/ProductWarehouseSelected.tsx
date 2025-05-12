import { useState } from "react";
import logos from "../../../../assets/logos";
import { InputNumber, InputTextareaBlock, InputTextBlock } from "../../../../components/Input";
import Windows from "../../../../components/Windows"
import { dateLocalWhitTime } from "../../../../helpers";
import { useForm } from "../../../../hooks";
// import { ProductoAlmacenDetallado } from "../../../../interface";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { ProductWarehouse } from "../../../../interfaces";
import { updateProductWarehouseAPI } from "../../../../redux/warehouses/warehousesThunk";
// import { updateProductoAlmacenAPI } from "../../../../redux/warehouses/almacenThunks";


interface SelectedProductoAlmacenProp {
    product: ProductWarehouse;
    closeButton: () => void;
}

export default function ProductWarehouseSelected({ product, closeButton }: SelectedProductoAlmacenProp) {

    const dispatch = useDispatch<AppDispatch>();
    const {loadingData} = useSelector((s:RootState) => s.Aplication);
    const { data, handleInputChange, resetData } = useForm<{ minQuantity: string }>({ minQuantity: product.minQuantity.toString() });
    const [editMode, setEditMode] = useState(false);

    const updateProducto = () => {
        const minQuantity = isNaN(parseInt(data.minQuantity))? 0: parseInt(data.minQuantity);
        dispatch( updateProductWarehouseAPI({ productWarehouseId: product.id, minQuantity }) );
    }

    const cancelUpdateProducto = () => {
        setEditMode(false);
        resetData();
    }


    return (
        <Windows tittle="DETALLES DEL PRODUCTO" closeButton={closeButton} footer={`Ultima actualización: ${dateLocalWhitTime(product.updatedAt)}`}>
            <div className="p-4 flex relative">
                <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg">

                    <img
                        src={product.Product.image || logos.logoNoImage}
                        alt="Preview"
                        className="object-cover rounded-lg h-[200px]"
                    />
                </div>

                <div className="ms-3" >
                    <div className="flex flex-col" >
                        <div className="flex items-center text-center border-b-[1px] border-secondary mb-2 text-secondary">
                            <span className="me-3" >INFORMACIÓN</span>
                        </div>
                        <div className="flex" >
                            <div>
                                <InputTextBlock
                                    value={product.Product.code}
                                    name="codigo"
                                    placeholder="Código"
                                    uppercase
                                />
                                <InputTextBlock
                                    value={product.Product.name}
                                    name="nombre"
                                    placeholder="Nombre"
                                    uppercase
                                />
                                <InputTextareaBlock
                                    value={product.Product.description}
                                    name="descripcion"
                                    placeholder="Descripción"
                                />
                            </div>
                            <div className="flex flex-col ms-3" >

                                <InputTextBlock
                                    className="w-[120px]"
                                    value={product.Product.Brand.name || 'Sin marca'}
                                    name="marca"
                                    placeholder="Marca"
                                    uppercase
                                />
                                <InputTextBlock
                                    className="w-[120px]"
                                    value={product.Product.Category.name || 'Sin categoría'}
                                    name="categoria"
                                    placeholder="Categoría"
                                    uppercase
                                />
                                <InputTextBlock
                                    className="w-[120px]"
                                    value={product.Product.UnitMeasure.name || 'Sin U/M'}
                                    name="unidadMedida"
                                    placeholder="Unidad de medida"
                                    uppercase
                                />
                            </div>
                            <div className="flex flex-col ms-3">
                                <InputTextBlock
                                    className="w-[120px]"
                                    value={product.quantity.toString()}
                                    name="cantidad"
                                    placeholder="Cantidad"
                                    uppercase
                                />
                                <div className="flex items-end" >
                                    {editMode?
                                        <InputNumber
                                        handleInputChange={handleInputChange}
                                        className="w-[120px]"
                                        value={data.minQuantity}
                                        name="minQuantity"
                                        placeholder="Cantidad mínima"
                                        />
                                        :
                                        <InputTextBlock
                                        className="w-[120px]"
                                        value={product.minQuantity.toString()}
                                        name="cantidadMinima"
                                        placeholder="Cantidad mínima"
                                        uppercase
                                        />
                                    }
                                    <button
                                        type="button"
                                        className="text-secondary ms-1 disabled:cursor-not-allowed"
                                        disabled={loadingData}
                                        onClick={() => { setEditMode(s => !s) }}
                                    >
                                        {!loadingData && <FaEdit />}
                                        {loadingData && <AiOutlineLoading className="ms-2 animate-spin" />}
                                    </button>
                                </div>
                                {editMode&& <div>
                                    <button 
                                    className="bg-success/80 px-1 text-[10px] text-white hover:bg-success rounded-full disabled:bg-secondary" 
                                    type="button"
                                    onClick={updateProducto}
                                    disabled = { data.minQuantity === product.minQuantity.toString() }
                                    >Guardar</button>
                                    <button 
                                    onClick={cancelUpdateProducto}
                                    className="bg-danger/80 px-1 ms-2 text-[10px] text-white hover:bg-danger rounded-full" 
                                    type="button">Cancelar</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Windows >
    );
}