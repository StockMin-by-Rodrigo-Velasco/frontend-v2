import { useSelector } from "react-redux";
import HeaderSection from "../../../components/HeaderSection";
import { RootState } from "../../../redux/store";
import { useState } from "react";
import { Producto } from "../../../interface";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import ProductoCard from "./components/ProductoCard";
import ProformaVenta from "./windows/ProformaVentaWindows";
import { FaBasketShopping } from "react-icons/fa6";


interface ProductoForDataTable extends Producto {
    unidadMedida: string;
    marca: string;
    categoria: string;
}

const dataInitialState: ProductoForDataTable = {
    id: '',
    sucursalId: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    deleted: false,
    createdAt: '',
    updatedAt: '',
    categoriaId: '',
    marcaId: '',
    unidadMedidaId: '',

    Marca: { id: '', sucursalId: '', nombre: '', origen: '', deleted: false },
    Categoria: { id: '', sucursalId: '', nombre: '', detalle: '', deleted: false },
    UnidadMedida: { id: '', nombre: '', abreviatura: '', detalle: '' },

    unidadMedida: '',
    marca: '',
    categoria: '',
}

interface FilterInterface {
    buscar: string;
    categoria: string;
    marca: string;
}
const filterInitialState: FilterInterface = {
    buscar: '',
    categoria: '',
    marca: '',
}

export default function TiendaVentas() {

    const { listaProductos, listaMarcas, listaCategorias } = useSelector((s: RootState) => s.Productos);
    const { loadingApplication } = useSelector((s: RootState) => s.Aplication);

    const [openProformaVenta, setOpenProformaVenta] = useState(false);

    const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
    const [filteredProducto, setFilteredProducto] = useState<ProductoForDataTable[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const newFilter = { ...filter, [name]: value };
        const newData = listaProductos.filter(i =>
            i.Categoria.nombre?.includes(newFilter.categoria) &&
            i.Marca.nombre?.includes(newFilter.marca) &&
            (i.nombre.includes(newFilter.buscar) || i.codigo.includes(newFilter.buscar))
        );

        const newListaProductos: ProductoForDataTable[] = newData.map(p => ({
            ...p,
            unidadMedida: p.UnidadMedida.nombre,
            marca: p.Marca.nombre,
            categoria: p.Categoria.nombre
        }))
        setFilteredProducto([...newListaProductos]);
        setFilter(newFilter);
    }



    return (
        <>

            {openProformaVenta && <ProformaVenta closeButton={() => { setOpenProformaVenta(false) }} />}
            <HeaderSection>
                <InputSearch
                    handleInputChange={handleChange}
                    name='buscar'
                    placeholder="Buscar"
                    value={filter.buscar}
                />
                <InputSelectSearch
                    value={filter.categoria}
                    className="ms-auto"
                    name="categoria"
                    placeholder="Categoría: "
                    options={listaCategorias.map(m => ({ value: m.nombre, name: m.nombre }))}
                    optionDefault="Todas..."
                    handleInputChange={handleChange}
                />
                <InputSelectSearch
                    value={filter.marca}
                    className="ms-3"
                    name="marca"
                    placeholder="Marca: "
                    options={listaMarcas.map(m => ({ value: m.nombre, name: m.nombre }))}
                    optionDefault="Todas..."
                    handleInputChange={handleChange}
                />

                <button
                    type="button"
                    onClick={() => { setOpenProformaVenta(true) }}
                    className="relative ms-5 w-10 rounded border-2 border-success text-success text-[22px] flex justify-center items-center overflow-hidden">
                    <FaBasketShopping />
                    <span className="bg-danger rounded-br text-white w-4 h-4 absolute top-0 left-0 text-[12px] flex justify-center items-center">4</span>
                </button>
            </HeaderSection>

            <BodySection>
                <div className="flex flex-wrap justify-evenly relative pt-5">

                    {listaProductos.map(p => (
                        <ProductoCard key={p.id} producto={p} />
                    ))}

                    {listaProductos.map(p => (
                        <ProductoCard key={p.id} producto={p} />
                    ))}

                    {listaProductos.map(p => (
                        <ProductoCard key={p.id} producto={p} />
                    ))}

                </div>
            </BodySection>
        </>
    );
}