import { useEffect, useState } from "react";
import { Button } from "../../../../components/Buttons";
import ProductShoppingCart from "./ProductShoppingCart";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { ProductCart } from "../../../../interfaces/formInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { PiMoneyDuotone } from "react-icons/pi";
import { IoClose, IoDocumentTextOutline, IoSearch } from "react-icons/io5";
import { hideNotification, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
import { CreateProductSaleDto } from "../../../../interfaces";
import { dateLocal } from "../../../../helpers";
import { InputText, InputTextBlock } from "../../../../components/Input";
import { useForm } from "../../../../hooks";

interface ShoppingCartProp {
    productsCart: ProductCart[];
    handleShoppingCart: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    toggleProduct: (productId: string) => void;
}
interface DataSale {
    customerName: string;
    details: string;
}

export default function ShoppingCart({ productsCart, handleShoppingCart, toggleProduct }: ShoppingCartProp) {
    const { exchangeRateFavorite } = useSelector((s: RootState) => s.Sales);
    const { logo, userData } = useSelector((s: RootState) => s.Branch);
    const dispatch = useDispatch<AppDispatch>();

    const [productsSale, setProductsSale] = useState<CreateProductSaleDto[]>([]);

    const { data, handleInputChange } = useForm<DataSale>({ customerName: '', details: '' });
    const [paymentType, setPaymentType] = useState<'PAID' | 'CREDIT'>('PAID');

    const [openShoppingCart, setOpenShoppingCart] = useState(false);
    const [openCreateSale, setOpenCreateSale] = useState(false);
    const [openCreateQuotation, setOpenCreateQuotation] = useState(false);

    const totalAmount = (): string => {
        return productsCart.reduce((acc, p) => { return acc + (p.quantityCart * parseFloat(p.priceCart)) }, 0).toFixed(2)
    }

    const verifyCart = () => {
        const insufficientQuantity = productsCart.find(p => p.quantityCart > p.quantity);
        if (insufficientQuantity) {
            dispatch(showNotificationWarning({ tittle: 'VENTA', description: 'Uno o mas productos no cuentan con las cantidades suficientes para su venta.' }));
            setTimeout(() => { dispatch(hideNotification()) }, 5000);
            return;
        }
        const createProductSaleDto: CreateProductSaleDto[] = productsCart.map(p => ({
            productId: p.Product.id,
            productWarehouseId: p.id, // ID por que ProductSale es un extend de ProductWarehouse
            quantity: p.quantityCart,
            price: p.priceCart
        }))
        setProductsSale(createProductSaleDto);
        setOpenCreateSale(true);
    }
    useEffect(() => {
        setOpenCreateSale(false);
        setOpenCreateQuotation(false);
    }, [productsCart])
    

    return (
        <div className={`${openShoppingCart ? 'h-[90vh]' : 'h-8'} bg-white rounded-t-lg w-[400px] absolute bottom-0 right-5 transition-all duration-300`} >
            <button
                onClick={() => { setOpenShoppingCart(s => !s) }}
                type="button"
                className="w-full ms-auto py-1 px-2 rounded-t-lg flex justify-center items-center bg-primary bg-opacity-80 text-white hover:bg-opacity-100 focus:outline-none"
            >
                <MdOutlineShoppingCart className="me-2" />
                <span>Carrito</span>
                {(productsCart.length !== 0) &&
                    <span className="bg-danger text-[12px] w-4 rounded-lg flex justify-center items-center ms-2" >{productsCart.length}</span>
                }

                <span
                    className={`${(productsCart.length === 0) && 'opacity-0'} ms-auto bg-success/40 px-2 rounded`}
                >
                    {totalAmount()} {exchangeRateFavorite.Currency.symbol}
                </span>

                <IoIosArrowUp className={`${openShoppingCart && 'rotate-180'} ms-2 transition-all duration-300`} />
            </button>
            {(!openCreateSale && !openCreateQuotation) &&
                <>
                    <div className="h-[82vh] p-2 overflow-y-scroll scroll-custom">
                        {productsCart.map((p, i) => (
                            <ProductShoppingCart key={p.id} index={i} product={p} toggleProduct={toggleProduct} handleShoppingCart={handleShoppingCart} />
                        ))}
                    </div>
                    <div className="flex justify-center" >
                        <div className="mt-auto flex justify-center" >
                            <button
                                className="bg-primary bg-opacity-80 flex items-center rounded-full px-4 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed"
                            >
                                <span className="me-2">COTIZAR</span> <IoDocumentTextOutline />
                            </button>
                        </div>

                        <div className="mt-auto flex justify-center" >
                            <button
                                onClick={verifyCart}
                                className="ms-3 bg-success bg-opacity-80 flex items-center rounded-full px-4 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed"
                            >
                                <span className="me-2">VENDER</span> <PiMoneyDuotone />
                            </button>
                        </div>
                    </div>
                </>
            }

            {/* //* ----------------------------------- VENTA ----------------------------------- */}
            {openCreateSale &&
                <>
                    <div className="h-[82vh] p-2 overflow-y-scroll scroll-custom">
                        <div className="flex items-center" >
                            <img src={logo} className="h-14" />
                            <div className="text-[14px] w-full flex flex-col items-end">
                                <span className="font-medium text-secondary text-[12px] py-0">Fecha:</span>
                                <p>{dateLocal(Date.now())}</p>
                            </div>
                        </div>
                        <div className="my-4 px-3">
                            <InputTextBlock name="name" placeholder="Responsable:" value={`${userData.name} ${userData.lastName}`} />
                            <div className=" w-full flex items-end " >
                                <InputText
                                    handleInputChange={handleInputChange}
                                    name="customerName"
                                    placeholder="Cliente:"
                                    value={data.customerName}
                                />
                                <button
                                    className="w-[20px] h-[20px] flex justify-center items-center bg-danger/80 text-white rounded ms-3 hover:bg-danger"
                                >
                                    <IoClose />
                                </button>

                                <button
                                    className="h-[20px] px-2 flex justify-center items-center bg-secondary/80 text-white rounded ms-auto hover:bg-secondary"
                                >
                                    <span className="me-2">Buscar</span>  <IoSearch />
                                </button>
                            </div>
                            <InputText
                                handleInputChange={handleInputChange}
                                name="details"
                                placeholder="Detalles:"
                                value={data.details}
                            />

                            <div className="border border-primary mt-3 rounded" >
                                <button
                                    className={paymentType === 'PAID' ? "bg-primary w-[50%] text-white" : "w-[50%] text-primary"}
                                    onClick={() => { setPaymentType('PAID') }}
                                >
                                    PAGADO
                                </button>
                                <button
                                    className={paymentType === 'CREDIT' ? "bg-primary w-[50%] text-white" : "w-[50%] text-primary"}
                                    onClick={() => { setPaymentType('CREDIT') }}
                                >
                                    CREDITO
                                </button>
                            </div>

                            {(paymentType === 'PAID') &&
                                <div className="border border-success mt-3 rounded flex" >
                                    <div className="w-[50%] text-success">
                                        <span className="flex items-center justify-center"><PiMoneyDuotone className="me-2" /> COBRAR</span>
                                    </div>
                                    <span className="w-[50%] flex justify-center bg-success font-bold" > {totalAmount()} {exchangeRateFavorite.Currency.symbol} </span>
                                </div>
                            }
                        </div>
                        <table className="text-center w-full" >
                            <thead className="text-[14px] bg-secondary/50">
                                <tr>
                                    <th>NOMBRE</th>
                                    <th>CANT.</th>
                                    <th>P/UNIT.</th>
                                    <th>SUBTOTAL</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px]">
                                {productsCart.map((p, i) => (
                                    <tr key={i} className="border-b border-secondary" >
                                        <td>{p.Product.name.toUpperCase()}</td>
                                        <td>{p.quantityCart} {p.Product.UnitMeasure.abbreviation.toUpperCase()}</td>
                                        <td>{p.priceCart} {exchangeRateFavorite.Currency.symbol}</td>
                                        <td>{(parseFloat(p.priceCart) * p.quantityCart).toFixed(2)} {exchangeRateFavorite.Currency.symbol}</td>
                                    </tr>
                                ))}
                                <tr className="bg-secondary/50 font-semibold" >
                                    <td colSpan={2} className="text-start ps-2">TOTAL</td>
                                    <td colSpan={2} className="text-end pe-2">{totalAmount()} {exchangeRateFavorite.Currency.symbol}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-auto flex justify-center" >
                        <Button color="danger" label="ATRAS" className="me-2" onClick={() => { setOpenCreateSale(false) }} />
                        <Button color="success" label="REALIZAR VENTA" onClick={() => { setOpenCreateSale(true) }} />
                    </div>
                </>
            }


        </div>
    );
}