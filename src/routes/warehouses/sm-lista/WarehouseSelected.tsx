import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import HeaderSection from "../../../components/HeaderSection";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import { TbLogout2, TbReportAnalytics } from "react-icons/tb";
import BodySection from "../../../components/BodySection";
import { logoutWarehouse } from "../../../redux/warehouses/warehousesSlice";
import { initialProductWarehouse, ProductWarehouse } from "../../../interfaces";
import logos from "../../../assets/logos";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import CreateManyProductsWarehouse from "./windows/CreateManyProductsWarehouse";
import ProductWarehouseSelected from "./windows/ProductWarehouseSelected";
import CreateDocEntry from "./windows/CreateDocEntry";
import DocEntries from "./windows/DocEntries";
import FooterSection from "../../../components/FooterSection";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";

interface FilterInterface {
  search: string;
  category: string;
  brand: string;
}
const filterInitialState: FilterInterface = {
  search: '',
  category: '',
  brand: '',
}


export default function WarehouseSelected() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loadingData } = useSelector((s: RootState) => s.Aplication);
  const { brands, categories } = useSelector((s: RootState) => s.Products);
  const { warehouseSelected, productsWarehouse } = useSelector((s: RootState) => s.Warehouses);

  const [filter, setFilter] = useState<FilterInterface>(filterInitialState);
  const [filteredProducts, setFilteredProducts] = useState<ProductWarehouse[]>([]);

  const [openCreateManyProductsWarehouse, setOpenCreateManyProductsWarehouse] = useState(false);
  const [openProductWarehouseSelected, setOpenProductWarehouseSelected] = useState(false);


  const [openCreateDocEntry, setOpenCreateDocEntry] = useState(false);
  const [openDocEntries, setOpenDocEntries] = useState(false);

  const [productWarehouseSelected, setProductWarehouseSelected] = useState<ProductWarehouse>(initialProductWarehouse)

  const logoutAlmacen = () => {
    dispatch(logoutWarehouse())
    navigate('/main/warehouses/list');
  }

  const getProduct = (productoData: ProductWarehouse) => {
    setProductWarehouseSelected(productoData);
    setOpenProductWarehouseSelected(true)
  }

  const filterProducts = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    const newFilter = { ...filter, [name]: value };
    const newData = productsWarehouse.filter(p =>
      p.Product.Category.id.includes(newFilter.category) &&
      p.Product.Brand.id.includes(newFilter.brand) &&
      (p.Product.name.includes(newFilter.search) || p.Product.code.includes(newFilter.search))
    )
    setFilteredProducts(newData);
    setFilter(newFilter);
  }

  useEffect(() => {
    setFilteredProducts(productsWarehouse);
  }, [productsWarehouse])
  return (
    <>
      {openCreateManyProductsWarehouse && <CreateManyProductsWarehouse closeButton={() => { setOpenCreateManyProductsWarehouse(false) }} />}
      {openProductWarehouseSelected && <ProductWarehouseSelected product={productWarehouseSelected} closeButton={() => { setOpenProductWarehouseSelected(false) }} />}
      {openCreateDocEntry && <CreateDocEntry closeButton={() => setOpenCreateDocEntry(false)} />}
      {openDocEntries && <DocEntries closeButton={() => setOpenDocEntries(false)} />}


      <HeaderSection>
        <InputSearch
          handleInputChange={filterProducts}
          name='search'
          placeholder="Buscar"
          value={filter.search}
        />

        <div
          className="w-[200px] flex justify-center items-center border relative overflow-hidden border-primary text-primary rounded-lg ms-auto me-auto transition-all duration-300 cursor-pointer"
          onClick={() => { setOpenDocEntries(true) }}
        >
          <span className="uppercase flex" >{warehouseSelected.name} <span className="ms-2 text-[20px]" ><TbReportAnalytics /></span> </span>

          <span className="opacity-0 w-[200px] flex justify-center items-center text-white absolute top-0 bottom-0 transition-all duration-300 bg-primary text-[10px] hover:text-[14px] hover:opacity-100">
            Historial de ingresos
            <span className="ms-2 text-[20px]"><TbReportAnalytics /></span>
          </span>
        </div>

        <InputSelectSearch
          value={filter.category}
          className="ms-auto"
          name="category"
          placeholder="Categoría: "
          options={categories.map(m => ({ value: m.id, name: m.name }))}
          optionDefault="Todas..."
          handleInputChange={filterProducts}
        />

        <InputSelectSearch
          value={filter.brand}
          className="ms-3"
          name="brand"
          placeholder="Marca: "
          options={brands.map(m => ({ value: m.id, name: m.name }))}
          optionDefault="Todas..."
          handleInputChange={filterProducts}
        />

        <button onClick={logoutAlmacen} className="flex items-center text-white ms-2 rounded-md px-3 bg-danger/80 hover:bg-danger" type="button">
          <span className="me-2" >Salir</span> <TbLogout2 />
        </button>
      </HeaderSection>
      <BodySection>
        <table className="table-auto w-full text-left" >
          <thead className="bg-primary text-white sticky top-0">
            <tr>
              <th className="uppercase text-center">IMAGEN</th>
              <th className="uppercase text-center">CODIGO</th>
              <th className="uppercase text-center">NOMBRE</th>
              <th className="uppercase text-center">MEDIDA</th>
              <th className="uppercase text-center">CANTIDAD</th>
              <th className="uppercase text-center">ESTADO</th>
              <th className="uppercase text-center">MAS</th>
            </tr>
          </thead>
          <tbody>
            {(loadingData && (filteredProducts.length === 0)) && <tr>
              <td className="p-3" colSpan={7}>
                <div className="flex justify-center" >
                  <span>Cargando datos...</span>
                </div>
              </td>
            </tr>}
            {filteredProducts.map(p => (
              <tr key={p.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >

                <td className="py-2">
                  <div className="flex justify-center">
                    <img src={(p.Product.image !== '') ? p.Product.image : logos.logoNoImage} className="w-14" />
                  </div>
                </td>
                <td className="py-2 text-center"><p>{p.Product.code}</p></td>
                <td className="py-2 text-center"><p>{p.Product.name}</p></td>
                <td className="py-2 text-center"><p>{p.Product.UnitMeasure.abbreviation}</p></td>
                <td className="py-2 text-center"><p>{p.quantity}</p></td>
                <td>
                  {(p.minQuantity > 0) && (p.minQuantity > 0) ?
                    <div className="w-full h-full flex justify-center items-center">
                      {(p.quantity > (p.minQuantity * 2)) && <div className="bg-success rounded h-5 w-2"></div>}
                      {((p.quantity <= (p.minQuantity * 2)) && (p.quantity > p.minQuantity)) && <div className="bg-warning rounded h-5 w-2"></div>}
                      {(p.quantity <= p.minQuantity) && <div className="bg-danger rounded h-5 w-2"></div>}
                    </div>
                    :
                    <div className="w-full h-full flex justify-center items-center">
                      <div className="bg-secondary rounded h-5 w-2" ></div>
                    </div>
                  }
                </td>
                <td className="text-center text-secondary" >
                  <button type="button" onClick={() => { getProduct(p) }} ><BsBoxArrowInUpRight /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </BodySection>

      <FooterSection>
        <span className="bg-secondary text-white text-[12px] px-2 rounded-full" > {productsWarehouse.length} Productos</span>
        <button
            onClick={() => setOpenCreateDocEntry(true)}
            type="button"
            className="ms-auto py-1 px-2 rounded-full flex justify-center items-center bg-primary bg-opacity-80 text-white hover:bg-opacity-100"
          >
            <IoDocumentTextOutline className="me-2" /> Ingresar
          </button>
          <button
            onClick={() => setOpenCreateManyProductsWarehouse(true)}
            type="button"
            className="ms-2 py-1 px-2 rounded-full flex justify-center items-center bg-success bg-opacity-80 text-white hover:bg-opacity-100"
          >
            <MdOutlineLibraryAdd className="me-2" /> Registrar
          </button>
      </FooterSection>
    </>
  );
}