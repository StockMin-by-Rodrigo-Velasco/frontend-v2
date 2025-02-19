import { useDispatch, useSelector } from "react-redux";
import { InputFileImage, InputSelect, InputText, InputTextarea } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { useForm } from "../../../../hooks";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useState } from "react";
import { createProductoAPI } from "../../../../redux/productos/productosThunk";
import { Button, ButtonColors, ButtonSubmit } from "../../../../components/Buttons";
import logos from "../../../../assets/logos";

interface ProductoSelectedWindowsPropInterface {
    closeButton: () => void
}
interface FormProducto {
    codigo: string;
    nombre: string;
    descripcion: string;
    categoriaId: string;
    marcaId: string;
    unidadMedidaId: string;
}


export default function CreateProductoWindow({ closeButton }: ProductoSelectedWindowsPropInterface) {

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { listaCategorias, listaMarcas, listaUnidadesMedida } = useSelector((s: RootState) => s.Productos);
    const dispatch = useDispatch<AppDispatch>();
    const { data, handleInputChange, resetData } = useForm<FormProducto>({ codigo:'', nombre:'', descripcion:'', categoriaId:'', marcaId:'', unidadMedidaId:''});
    const [imagen, setImagen] = useState<File|undefined>(undefined);

    const createProducto = (e: FormEvent) => {
        e.preventDefault();    
        dispatch( createProductoAPI(data, imagen) );
    }
    const cancelUpdateProducto = () => {
        resetData();
    }

    return (
        <Windows tittle='nuevo producto' closeButton={closeButton} >
            <div className="p-4 flex relative">
                <div>
                    <InputFileImage name="file" imageDefault={logos.logoColor} placeholder="Subir imagen..." setFileValue={setImagen} />
                </div>

                <div className="ms-3" >
                    <form className="flex flex-col" onSubmit={createProducto} >
                        <div className="flex items-center text-center border-b-[1px] border-secondary mb-2 text-secondary">
                            <span className="me-3" >INFORMACIÓN</span>
                        </div>
                        <div className="flex" >
                            <div>
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={data.codigo}
                                    name="codigo"
                                    placeholder="Codigo"
                                    required
                                />
                                <InputText
                                    handleInputChange={handleInputChange}
                                    value={data.nombre}
                                    name="nombre"
                                    placeholder="Nombre"
                                    required
                                />
                                <InputTextarea
                                    handleInputChange={handleInputChange}
                                    value={data.descripcion}
                                    name="descripcion"
                                    placeholder="Descripcion" 
                                />
                            </div>
                            <div className="flex flex-col ms-3" >
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.categoriaId}
                                    name='categoriaId'
                                    placeholder="Categoria"
                                    options={listaCategorias.map(c => ({name: c.nombre, value: c.id}))}
                                    optionDefault="Sin categoría"
                                    required
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.marcaId}
                                    name='marcaId'
                                    placeholder="Marca"
                                    options={listaMarcas.map(m => ({ name: m.nombre, value: m.id }))}
                                    optionDefault="Sin Marca"
                                    required
                                />
                                <InputSelect
                                    handleInputChange={handleInputChange}
                                    value={data.unidadMedidaId}
                                    name='unidadMedidaId'
                                    placeholder="U. Medida"
                                    options={listaUnidadesMedida.map(um => ({ name: um.abreviatura, value: um.id }))}
                                    optionDefault="Sin U/M"
                                    required
                                />
                            </div>
                        </div>

                        <div className="border-t-[1px] border-secondary mt-2 pt-2 flex" >
                            <ButtonSubmit label="Guardar" color={ButtonColors.success} className="me-3" loading={loadingData} spinner/>
                            <Button label="Cancelar" color={ButtonColors.danger} loading={loadingData} onClick={cancelUpdateProducto}/>
                        </div>
                    </form>
                </div>
            </div>
        </Windows>
    );
}