import { useDispatch, useSelector } from "react-redux";
import HeaderSection from "../../../components/HeaderSection";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { InputSearch, InputSelectSearch } from "../../../components/Input";
import BodySection from "../../../components/BodySection";
import { useForm, useFormArray } from "../../../hooks";
import { getProductsWarehouseAPI } from '../../../redux/warehouses/warehousesThunk';
import { hideNotification, showNotificationWarning } from "../../../redux/notification/notificationSlice";
import ProductCard from "./components/ProductCard";
import { initialSerchFilter, ProductCart, ProductStore, SearchFilter } from "../../../interfaces/formInterface";
import { TbReportAnalytics } from "react-icons/tb";
import { calculatorMultiply } from "../../../helpers/calculator";
import FooterSection from "../../../components/FooterSection";
import ShoppingCart from "./components/ShoppingCart";
import PurchaseSummary from "./windows/PurchaseSummary";
import ViewDocSale from "./windows/ViewDocSale";
import { DocSale, initialDocSale } from "../../../interfaces";
import SalesAndQuotationsList from "./windows/SalesAndQuotationsList";

export default function Store() {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { userData } = useSelector((s: RootState) => s.Branch);
    const { exchangeRateFavorite } = useSelector((s: RootState) => s.Sales);
    const { warehouses, productsWarehouse } = useSelector((s: RootState) => s.Warehouses);
    const { brands, categories } = useSelector((s: RootState) => s.Products);

    const dispatch = useDispatch<AppDispatch>();

    const [openPurchaseSummary, setOpenPurchaseSummary] = useState(false);
    const [openViewDocSale, setOpenViewDocSale] = useState(false);
    const [openSalesAndQuotationsList, setOpenSalesAndQuotationsList] = useState(false);

    const [docSaleSelected, setDocSaleSelected] = useState<DocSale>(initialDocSale);
    const [productsStore, setProductsStore] = useState<ProductStore[]>([]);
    const { arrayData: productsCart, handleInputChange: handleShoppingCart, replaceData } = useFormArray<ProductCart>([]);

    const { data: filter, handleInputChange } = useForm<SearchFilter>(initialSerchFilter);
    const filterProducts = (p: ProductStore) => {
        return (p.Product.Category.id === filter.category || filter.category === '') &&
            (p.Product.Brand.id === filter.brand || filter.brand === '') &&
            (p.Product.name.toLowerCase().includes(filter.search.toLowerCase()) || p.Product.code.includes(filter.search.toLocaleLowerCase()))
    }

    const openDocSale = (doc: DocSale) => {
        setDocSaleSelected(doc);
        setOpenViewDocSale(true);
    }

    const toggleProduct = (productId: string) => {
        let newProductsCart: ProductCart[] = productsCart;
        let newProductsStore: ProductStore[] = productsStore;

        for (let i = 0; i < newProductsStore.length; i++) {
            if (newProductsStore[i].Product.id === productId) {
                if (newProductsStore[i].selected) {
                    newProductsStore[i].selected = false;
                    const { Product } = newProductsStore[i];
                    newProductsCart = newProductsCart.filter(ps => ps.Product.id !== Product.id);
                } else {
                    newProductsStore[i].selected = true;
                    const { selected, ...res } = newProductsStore[i];
                    newProductsCart = [{ ...res, quantityCart: 1, priceCart: res.Product.price || '0' }, ...newProductsCart];
                }
            }
        }
        setProductsStore([...newProductsStore]);
        replaceData([...newProductsCart]);
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
            const productsCartObj = productsCart.reduce((acc, p) => { acc[p.id] = p; return acc }, {} as Record<string, ProductCart>);
            setProductsStore(productsWarehouse.map(p => ({
                ...p,
                Product: {
                    ...p.Product,
                    price: p.Product.price ? calculatorMultiply({ num1: p.Product.price, num2: exchangeRateFavorite.rateToUSD, decimals: 2 }) : undefined
                },
                selected: productsCartObj[p.id] ? true : false
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
            {openPurchaseSummary && <PurchaseSummary closeButton={() => { setOpenPurchaseSummary(false) }} productsCart={productsCart} />}
            {openViewDocSale && <ViewDocSale closeButton={() => setOpenViewDocSale(false)} docSale={docSaleSelected} />}
            {openSalesAndQuotationsList&& <SalesAndQuotationsList closeButton={() => setOpenSalesAndQuotationsList(false)}/>}

            <HeaderSection>
                <InputSearch
                    handleInputChange={handleInputChange}
                    name='search'
                    placeholder="Buscar"
                    value={filter.search}
                />

                <div
                    className="w-[200px] flex justify-center items-center border relative overflow-hidden border-primary text-primary rounded-lg ms-auto me-auto transition-all duration-300 cursor-pointer"
                    onClick={() => {setOpenSalesAndQuotationsList(true)}}
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
            <ShoppingCart
                handleShoppingCart={handleShoppingCart}
                productsCart={productsCart}
                toggleProduct={toggleProduct}
                setOpenPurchaseSummary={setOpenPurchaseSummary}
                openDocSale={openDocSale}
            />
            <FooterSection>
                <p></p>
            </FooterSection>
        </>
    );
}