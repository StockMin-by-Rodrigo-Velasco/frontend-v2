import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "../../../components/HeaderSection";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import { useForm } from "../../../hooks";
import { getProductsWarehouseAPI } from '../../../redux/warehouses/warehousesThunk';
import { hideNotification, showNotificationWarning } from "../../../redux/notification/notificationSlice";
import ProductCard from "./components/ProductCard";
import { initialSerchFilter, ProductStore, SearchFilter } from "../../../interfaces/formInterface";
import { TbReportAnalytics } from "react-icons/tb";
import { calculatorMultiply } from "../../../helpers/calculator";
import { MdOutlineShoppingCart } from "react-icons/md";
import FooterSection from "../../../components/FooterSection";
import { IoIosArrowUp } from "react-icons/io";
import { ProductWarehouse } from "../../../interfaces";
import ProductShoppingCart from "./components/ProductShoppingCart";


export default function Store() {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { userData } = useSelector((s: RootState) => s.Branch);
    const { exchangeRateFavorite } = useSelector((s: RootState) => s.Sales);
    const { warehouses, productsWarehouse } = useSelector((s: RootState) => s.Warehouses);
    const { brands, categories } = useSelector((s: RootState) => s.Products);

    const dispatch = useDispatch<AppDispatch>();

    const [productsStore, setProductsStore] = useState<ProductStore[]>([]);
    const [productsShoppingCart, setProductsShoppingCart] = useState<ProductWarehouse[]>([])

    const [openShoppingCart, setOpenShoppingCart] = useState(false);

    const { data: filter, handleInputChange } = useForm<SearchFilter>(initialSerchFilter);
    const filterProducts = (p: ProductStore) => {
        return (p.Product.Category.id === filter.category || filter.category === '') &&
            (p.Product.Brand.id === filter.brand || filter.brand === '') &&
            (p.Product.name.toLowerCase().includes(filter.search.toLowerCase()) || p.Product.code.includes(filter.search.toLocaleLowerCase()))
    }

    const toggleProduct = (productId: string) => {
        let newProductsShoppingCart: ProductWarehouse[] = productsShoppingCart;
        let newProductsStore: ProductStore[] = productsStore;
        for (let i = 0; i < newProductsStore.length; i++) {
            if (newProductsStore[i].Product.id === productId) {
                if (newProductsStore[i].selected) {
                    newProductsStore[i].selected = false;
                    const { Product } = newProductsStore[i];
                    newProductsShoppingCart = newProductsShoppingCart.filter(ps => ps.Product.id !== Product.id);
                } else {
                    newProductsStore[i].selected = true;
                    const { selected, ...res } = newProductsStore[i];
                    newProductsShoppingCart = [res, ...newProductsShoppingCart];
                }
            }
        }
        setProductsStore([...newProductsStore]);
        setProductsShoppingCart([...newProductsShoppingCart]);
    }

    useEffect(() => {
        if (userData.warehouseId && (userData.warehouseId !== '') && productsStore.length === 0) { //* LLama al API solo si no hay productos
            dispatch(getProductsWarehouseAPI(
                userData.warehouseId, (products) => {
                    setProductsStore(products.map(p => ({
                        ...p,
                        Product: {
                            ...p.Product,
                            price: p.Product.price ? calculatorMultiply({ num1: p.Product.price, num2: exchangeRateFavorite.rateToUSD, decimals: 2 }) : undefined
                        },
                        selected: false
                    })))
                })
            );
        } else if (productsStore.length > 0) { //* Modifica las actualizaciones de los productos
            setProductsStore(productsWarehouse.map(p => ({
                ...p,
                Product: {
                    ...p.Product,
                    price: p.Product.price ? calculatorMultiply({ num1: p.Product.price, num2: exchangeRateFavorite.rateToUSD, decimals: 2 }) : undefined
                },
                selected: false
            })));
        } else {
            if (userData.warehouseId !== '') {
                dispatch(showNotificationWarning({
                    tittle: 'TIENDA',
                    description: 'Aun no fuiste registrado como vendedor. Por favor comunicate con el administrador de tu sucursal.'
                }))
                setTimeout(() => dispatch(hideNotification()), 10000);
            }
        }
    }, [productsWarehouse])
    return (
        <>
            <HeaderSection>
                <InputSearch
                    handleInputChange={handleInputChange}
                    name='search'
                    placeholder="Buscar"
                    value={filter.search}
                />

                <div
                    className="w-[200px] flex justify-center items-center border relative overflow-hidden border-primary text-primary rounded-lg ms-auto me-auto transition-all duration-300 cursor-pointer"
                    onClick={() => { console.log('Abrir historial') }}
                >
                    <span className="uppercase flex" >{warehouses.find(w => w.id === userData.warehouseId)?.name} <span className="ms-2 text-[20px]" ><TbReportAnalytics /></span> </span>

                    <span className="opacity-0 w-[200px] flex justify-center items-center text-white absolute top-0 bottom-0 transition-all duration-300 bg-primary text-[10px] hover:text-[14px] hover:opacity-100">
                        Ventas y cotizaciones
                        <span className="ms-2 text-[20px]"><TbReportAnalytics /></span>
                    </span>
                </div>

                <InputSelectSearch
                    value={filter.category}
                    name="category"
                    placeholder="Categoría: "
                    options={categories.map(m => ({ value: m.id, name: m.name }))}
                    optionDefault="Todas..."
                    handleInputChange={handleInputChange}
                />
                <InputSelectSearch
                    value={filter.brand}
                    className="ms-3"
                    name="brand"
                    placeholder="Marca: "
                    options={brands.map(m => ({ value: m.id, name: m.name }))}
                    optionDefault="Todas..."
                    handleInputChange={handleInputChange}
                />
            </HeaderSection>

            <BodySection>
                {(loadingData && (productsStore.length === 0)) &&
                    <p className="text-center text-secondary mt-5" > Obteniendo productos de la tienda...</p>
                }
                <div className="flex flex-wrap justify-evenly relative pt-5">
                    {productsStore.map(p => (filterProducts(p) &&
                        <ProductCard key={p.id} product={p} toggleProduct={toggleProduct} />
                    ))}
                </div>
            </BodySection>
            <div className={`${openShoppingCart ? 'h-[90vh]' : 'h-8'} bg-white w-96 absolute bottom-0 right-5 transition-all duration-300`} >
                <button
                    onClick={() => { setOpenShoppingCart(s => !s) }}
                    type="button"
                    className="w-full ms-auto py-1 px-2 rounded-t-lg flex justify-center items-center bg-primary bg-opacity-80 text-white hover:bg-opacity-100 focus:outline-none"
                >
                    <MdOutlineShoppingCart className="me-2" />
                    <span>Carrito</span>
                    {(productsShoppingCart.length !== 0) &&
                        <span className="bg-danger text-[12px] w-4 rounded-lg flex justify-center items-center ms-2" >{productsShoppingCart.length}</span>
                    }
                    <IoIosArrowUp className={`${openShoppingCart && 'rotate-180'} ms-auto transition-all duration-300`} />
                </button>
                <div className="h-full p-2 overflow-y-scroll scroll-custom" >
                    {productsShoppingCart.map(p => (
                        <ProductShoppingCart key={p.id} product={p} toggleProduct={toggleProduct} />
                    ))}
                </div>
            </div>
            <FooterSection>
                <p>footer</p>
            </FooterSection>
        </>
    );
}