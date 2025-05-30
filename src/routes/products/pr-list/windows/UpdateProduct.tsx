import { useDispatch, useSelector } from "react-redux";
import { InputFileImage, InputSelect, InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FaEdit } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { FormEvent, useState } from "react";
import { deleteProductAPI, updateProductAPI, updateProductImageAPI } from "../../../../redux/products/productsThunk";
import { Button, ButtonSubmit } from "../../../../components/Buttons";
import { BsFillTrashFill } from "react-icons/bs";
import { hideNotification, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { Product, UpdateProductDto } from "../../../../interfaces";
import logos from "../../../../assets/logos";
import { dateLocalWhitTime } from "../../../../helpers";


interface ProductoForDataTable extends Product {
    unitMeasure: string;
    brand: string;
    category: string;
}
interface UpdateProductProp {
    product: ProductoForDataTable,
    closeButton: () => void
}


export default function UpdateProduct({ product, closeButton }: UpdateProductProp) {

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    // const { type: typeNotification, showNotification } = useSelector((s: RootState) => s.Notification);
    const { idDeletedProduct, categories, brands, unitMeasures } = useSelector((s: RootState) => s.Products);
    const dispatch = useDispatch<AppDispatch>();
    // const { code, name, description, categoryId, brandId, unitMeasureId } = producto;
    const { data: dataUpdate, handleInputChange, resetData } = useForm<UpdateProductDto>({
        branchId: product.branchId,
        id: product.id,
        name: product.name,
        code: product.code,
        brandId: product.brandId,
        categoryId: product.categoryId,
        description: product.description,
        unitMeasureId: product.unitMeasureId
    });
    const [editMode, setEditMode] = useState(false);
    const [editModeImagen, setEditModeImagen] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);

    const updateProduct = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateProductAPI(dataUpdate));
    }
    const updateProductImage = () => {
        dispatch(updateProductImageAPI({productId: product.id, imagenUrl: product.image}, image));
    }
    const cancelUpdateProduct = () => {
        resetData();
        setEditMode(false);
    }

    // const deleteProduct = () => {
    //     if (typeNotification === 'WARNING' && showNotification) {
    //         dispatch(deleteProductAPI(product.id));
    //         dispatch(hideNotification());
    //     } else {
    //         dispatch(showNotificationWarning({ tittle: 'Eliminar producto', description: 'Si deseas continuar vuelve a presionar el botón de eliminación, caso contrario cierra este mensaje' }))
    //     }
    // }

    return (
        <Windows tittle={product.name} closeButton={closeButton}
            footer={`Creación: ${dateLocalWhitTime(product.createdAt)} - Ultima actualización: ${dateLocalWhitTime(product.updatedAt)}`}
        >
            <div className="p-4 flex relative">
                {(idDeletedProduct === product.id) &&
                    <div className="bg-black/20 absolute top-0 right-0 left-0 bottom-0 z-10 flex justify-center items-center backdrop-blur-[2px]" >
                        <h1 className="text-danger text-[50px] font-bold" >ELIMINADO</h1>
                    </div>
                }
                <div className="flex items-center relative" >
                    {editModeImagen ?
                        <div className="absolute top-1 right-1 flex text-white">
                            <button
                                onClick={updateProductImage}
                                className="bg-success bg-opacity-80 rounded-full w-5 h-5 flex justify-center items-center me-2 hover:bg-opacity-100"
                                type="button"
                            >
                                <IoCheckmark />
                            </button>
                            <button
                                onClick={() => setEditModeImagen(false)}
                                className="bg-danger bg-opacity-80 rounded-full w-5 h-5 flex justify-center items-center hover:bg-opacity-100"
                                type="button"
                            >
                                <IoClose />
                            </button>
                        </div>
                        :
                        <div className="absolute top-1 right-1 flex text-white">
                            <button
                                onClick={() => setEditModeImagen(true)}
                                className="bg-secondary bg-opacity-80 rounded-full w-7 h-7 flex justify-center items-center hover:bg-opacity-100"
                                type="button"
                            >
                                <FaEdit />
                            </button>
                        </div>
                    }
                    <InputFileImage name="file" imageDefault={product.image === '' ? logos.logoNoImage : product.image} placeholder="Subir imagen..." setFileValue={setImage} disabled={!editModeImagen} />
                </div>

                <div className="ms-3" >
                    <form className="flex flex-col" onSubmit={updateProduct} >
                        <div className="flex items-center text-center border-b-[1px] border-secondary mb-2 text-secondary">
                            <span className="me-3" >INFORMACIÓN</span>
                            <button
                                type="button"
                                className="disabled:cursor-not-allowed"
                                disabled={loadingData}
                                onClick={() => { setEditMode(s => !s) }}
                            >
                                {!loadingData && <FaEdit />}
                                {loadingData && <AiOutlineLoading className="ms-2 animate-spin" />}
                            </button>
                        </div>
                        <div className="flex" >
                            <div>
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={dataUpdate.code || ''}
                                    name="code"
                                    placeholder="*Código:"
                                    disabled={!editMode}

                                />
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={dataUpdate.name || ''}
                                    name="name"
                                    placeholder="*Nombre:"
                                    disabled={!editMode}

                                />
                                <InputTextarea
                                    handleInputChange={handleInputChange}
                                    value={dataUpdate.description || ''}
                                    name="description"
                                    placeholder="Descripción"
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="flex flex-col ms-3" >
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={dataUpdate.categoryId || ''}
                                    name='categoryId'
                                    placeholder="*Categoría:"
                                    options={categories.map(c => ({ name: c.name, value: c.id }))}
                                    optionDefault="Sin categoría"
                                    disabled={!editMode}
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={dataUpdate.brandId || ''}
                                    name='brandId'
                                    placeholder="*Marca:"
                                    options={brands.map(m => ({ name: m.name, value: m.id }))}
                                    optionDefault="Sin marca"
                                    disabled={!editMode}
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={dataUpdate.unitMeasureId || ''}
                                    name='unitMeasureId'
                                    placeholder="*U. Medida:"
                                    options={unitMeasures.map(m => ({ name: m.name, value: m.id }))}
                                    optionDefault="Sin U/M"
                                    disabled={!editMode}
                                />
                            </div>
                        </div>

                        <div className="border-t-[1px] border-secondary mt-2 pt-2 flex" >
                            <ButtonSubmit label="Guardar" color='success' className="me-3" disabled={!editMode} loading={loadingData} spinner />
                            <Button label="Cancelar" color='danger' disabled={!editMode} loading={loadingData} onClick={cancelUpdateProduct} />
                            {/* {editMode &&
                                <button
                                    onClick={deleteProduct}
                                    type="button"
                                    disabled={!editMode || loadingData}
                                    // disabled
                                    className="bg-warning bg-opacity-80 flex justify-center items-center text-white rounded-full w-7 h-7 ms-auto hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed">
                                    {loadingData ?
                                        <AiOutlineLoading className="animate-spin" />
                                        :
                                        <BsFillTrashFill />
                                    }
                                </button>
                            } */}
                        </div>
                    </form>
                </div>
            </div>
        </Windows>
    );
}