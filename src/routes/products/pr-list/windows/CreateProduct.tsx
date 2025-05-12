import { useDispatch, useSelector } from "react-redux";
import { InputFileImage, InputSelect, InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useState } from "react";
import { createProductAPI } from "../../../../redux/products/productsThunk";
import { Button, ButtonSubmit } from "../../../../components/Buttons";
import logos from "../../../../assets/logos";
import { CreateProductDto } from "../../../../interfaces";

interface ProductoSelectedWindowsPropInterface {
    closeButton: () => void
}

export default function CreateProduct({ closeButton }: ProductoSelectedWindowsPropInterface) {

    const { id: branchId } = useSelector((s: RootState) => s.Branch);
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { categories: listaCategorias, brands: listaMarcas, unitMeasuresBranch: listaUnidadesMedidaSucursal } = useSelector((s: RootState) => s.Products);
    const dispatch = useDispatch<AppDispatch>();
    const { data, handleInputChange, resetData } = useForm<CreateProductDto>({ 
        branchId,
        code:'', 
        name:'', 
        description:'',
        brandId:'', 
        categoryId:'', 
        unitMeasureId:''
    });
    const [image, setImage] = useState<File|undefined>(undefined);

    const createProduct = (e: FormEvent) => {
        e.preventDefault();
        dispatch( createProductAPI(data, image) );
    }
    const cancelUpdateProduct = () => {
        resetData();
    }

    return (
        <Windows tittle='nuevo producto' closeButton={closeButton} >
            <div className="p-4 flex relative">
                <div>
                    <InputFileImage name="file" imageDefault={logos.logoNoImage} placeholder="Subir imagen..." setFileValue={setImage} />
                </div>

                <div className="ms-3" >
                    <form className="flex flex-col" onSubmit={createProduct} >
                        <div className="flex items-center text-center border-b-[1px] border-secondary mb-2 text-secondary">
                            <span className="me-3" >INFORMACIÓN</span>
                        </div>
                        <div className="flex" >
                            <div>
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={data.code}
                                    name="code"
                                    placeholder="*Código:"
                                    required
                                />
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={data.name}
                                    name="name"
                                    placeholder="*Nombre:"
                                    required
                                />
                                <InputTextarea
                                    handleInputChange={handleInputChange}
                                    value={data.description||""}
                                    name="description"
                                    placeholder="Descripción" 
                                />
                            </div>
                            <div className="flex flex-col ms-3" >
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.categoryId}
                                    name='categoryId'
                                    placeholder="*Categoría:"
                                    options={listaCategorias.map(c => ({name: c.name, value: c.id}))}
                                    optionDefault="Sin categoría"
                                    required
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.brandId}
                                    name='brandId'
                                    placeholder="*Marca:"
                                    options={listaMarcas.map(m => ({ name: m.name, value: m.id }))}
                                    optionDefault="Sin Marca"
                                    required
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.unitMeasureId}
                                    name='unitMeasureId'
                                    placeholder="*U. Medida:"
                                    options={listaUnidadesMedidaSucursal.map(um => ({ name: um.UnitMeasure.name, value: um.unitMeasureId }))}
                                    optionDefault="Sin U/M"
                                    required
                                />
                            </div>
                        </div>

                        <div className="border-t-[1px] border-secondary mt-2 pt-2 flex" >
                            <ButtonSubmit label="Guardar" color='success' className="me-3" loading={loadingData} spinner/>
                            <Button label="Cancelar" color='danger' loading={loadingData} onClick={cancelUpdateProduct}/>
                        </div>
                    </form>
                </div>
            </div>
        </Windows>
    );
}