import React, { useEffect, useState } from "react";
import ProductShoppingCart from "./ProductShoppingCart";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { ProductCart } from "../../../../interfaces/formInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { PiMoneyDuotone } from "react-icons/pi";
import { IoClose, IoDocumentTextOutline, IoSearch } from "react-icons/io5";
import { hideNotification, showNotificationError, showNotificationWarning } from "../../../../redux/notification/notificationSlice";
import { CreateDocQuotationDto, CreateDocSaleDto, CreatePaymentDto, CreateProductSaleDto, Customer, DocQuotation, DocSale, initialCustomer } from "../../../../interfaces";
import { dateLocal, paymentMethodIcon } from "../../../../helpers";
import { InputText, InputTextBlock } from "../../../../components/Input";
import { useForm } from "../../../../hooks";
import CustomerList from '../windows/CustomerList';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import { createDocQuotationAPI, createDocSaleAPI } from "../../../../redux/sales/salesThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ShoppingCartProp {
    productsCart: ProductCart[];
    handleShoppingCart: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    setOpenPurchaseSummary: React.Dispatch<React.SetStateAction<boolean>>
    toggleProduct: (productId: string) => void;
    openDocSale: (doc: DocSale) => void;
    openDocQuotation: (doc: DocQuotation) => void;
}
interface DataSale {
    customerName: string;
    details: string;
}

export default function ShoppingCart({ productsCart, handleShoppingCart, setOpenPurchaseSummary, toggleProduct, openDocSale, openDocQuotation }: ShoppingCartProp) {

    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { exchangeRateFavorite, paymentMethods } = useSelector((s: RootState) => s.Sales);
    const { id: branchId, logo, userData } = useSelector((s: RootState) => s.Branch);

    const dispatch = useDispatch<AppDispatch>();

    const [paymentType, setPaymentType] = useState<'PAID' | 'CREDIT'>('PAID');
    const [paymentMethodId, setPaymentMethodId] = useState<string>('');
    const [customerSelected, setCustomerSelected] = useState<Customer>(initialCustomer);
    const [productsSale, setProductsSale] = useState<CreateProductSaleDto[]>([]);
    const [docType, setDocType] = useState<'SALE'|'QUOTATION'>('SALE');
    
    const { data, handleInputChange, replaceData } = useForm<DataSale>({ customerName: '', details: '' });

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openCustomerList, setOpenCustomerList] = useState(false);
    const [openShoppingCart, setOpenShoppingCart] = useState(false);
    const [openCreateSale, setOpenCreateSale] = useState(false);
    const [openCreateQuotation, setOpenCreateQuotation] = useState(false);

    const totalAmount = (): string => {
        return productsCart.reduce((acc, p) => { return acc + (p.quantityCart * parseFloat(p.priceCart)) }, 0).toFixed(2)
    }

    const selectCustomer = (customer: Customer) => {
        setCustomerSelected(customer);
        replaceData('customerName', `${customer.name.toUpperCase()} ${customer.lasName.toUpperCase()}`);
        setOpenCustomerList(false);
    }

    const generateProductsSale = () => {
        const createProductSaleDto: CreateProductSaleDto[] = productsCart.map(p => ({
            productId: p.Product.id,
            productWarehouseId: p.id, // ID por que ProductSale es un extend de ProductWarehouse
            quantity: p.quantityCart,
            price: p.priceCart
        }))
        setProductsSale(createProductSaleDto);
        setOpenCreateSale(true);
    }

    const verifyCreateDocSale = () => {
        const insufficientQuantity = productsCart.find(p => p.quantityCart > p.quantity);
        if (insufficientQuantity) {
            dispatch(showNotificationWarning({ tittle: 'VENTA', description: 'Uno o mas productos no cuentan con las cantidades suficientes para su venta.' }));
            setTimeout(() => { dispatch(hideNotification()) }, 5000);
            return;
        }

        if (productsSale.length <= 0) {
            dispatch(showNotificationError({ tittle: 'Registro de nueva venta', description: 'El carrito de compras no contiene productos dentro, por favor agregue productos e inténtelo de nuevo.' }));
            setTimeout(() => { dispatch(hideNotification()) }, 5000);
            return;
        }
        setDocType('SALE');
        setOpenConfirmDialog(true);
    }

    const createDocQuotation = () => {
        if (productsSale.length <= 0) {
            dispatch(showNotificationError({ tittle: 'Registro de nueva venta', description: 'El carrito de compras no contiene productos dentro, por favor agregue productos e inténtelo de nuevo.' }));
            setTimeout(() => { dispatch(hideNotification()) }, 5000);
            return;
        }
        setDocType('QUOTATION');
        setOpenConfirmDialog(true);
    }

    const createDocSaleOrQuotation = () => {
        let payments: CreatePaymentDto[] = [];
        if (paymentType === 'PAID') {
            payments = [
                {
                    paymentMethodId,
                    amount: totalAmount(),
                    description: ''
                }
            ]
        }

        if(docType === 'SALE'){
            const doc: CreateDocSaleDto = {
                branchId,
                userId: userData.id,
                currencyId: exchangeRateFavorite.Currency.id,
                paymentType,
                customerName: data.customerName,
                details: data.details,
                productsSale,
                payments
            }
            if (customerSelected.id !== '') doc.customerId = customerSelected.id;
            // console.log('venta',doc);
            dispatch(createDocSaleAPI(doc, openDocSale));
        }else if (docType === 'QUOTATION'){
            const newProductsSale = productsSale.map(({productWarehouseId, ...p})=>p);
            const doc: CreateDocQuotationDto = {
                branchId,
                userId: userData.id,
                currencyId: exchangeRateFavorite.Currency.id,
                customerName: data.customerName,
                details: data.details,
                productsSale: newProductsSale
            }
            if (customerSelected.id !== '') doc.customerId = customerSelected.id;
            // console.log('cotizacion',doc);
            dispatch(createDocQuotationAPI(doc, openDocQuotation));
        }
    }

    useEffect(() => {
        if (paymentMethodId === '') {
            const newPaymentMethod = paymentMethods.find(pm => pm.code === 'cash')?.id;
            setPaymentMethodId(newPaymentMethod || '');
        }
        setOpenCreateSale(false);
        setOpenCreateQuotation(false);

    }, [productsCart])


    return (
        <>
            {openCustomerList && <CustomerList selectCustomer={selectCustomer} closeButton={() => setOpenCustomerList(false)} />}
            {openConfirmDialog &&
                <ConfirmDialog
                    title="Registro de nueva venta"
                    description={`Se realizará una ${docType === 'SALE'? 'venta':'cotización'} ${customerSelected.id !== '' ? `al cliente ${customerSelected.name.toUpperCase()} ${customerSelected.lasName.toUpperCase()}` : ' un cliente SIN REGISTRAR'} por un monto de ${exchangeRateFavorite.Currency.symbol} ${totalAmount()}. ¿Desea continuar?`}
                    closeButton={() => setOpenConfirmDialog(false)}
                    action={createDocSaleOrQuotation}
                />
            }

            <div className={`${openShoppingCart ? 'h-[90vh] shadow-2xl' : 'h-8'} bg-white rounded-t-lg w-[400px] absolute bottom-0 right-5 transition-all duration-300`} >

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
                                    onClick={generateProductsSale}
                                    className="ms-3 bg-primary bg-opacity-80 flex items-center rounded-full px-4 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed"
                                >
                                    <span className="me-2">SIGUIENTE</span> <FaArrowRight />
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
                            <div className="my-3 px-3">
                                <InputTextBlock name="name" placeholder="Responsable:" value={`${userData.name.toUpperCase()} ${userData.lastName.toUpperCase()}`} />
                                <div className=" w-full flex items-end " >
                                    <InputText
                                        disabled={customerSelected.id !== '' || loadingData}
                                        handleInputChange={handleInputChange}
                                        name="customerName"
                                        placeholder="Cliente:"
                                        value={data.customerName}
                                    />
                                    <button
                                        disabled={loadingData}
                                        onClick={() => { setCustomerSelected(initialCustomer); replaceData('customerName', '') }}
                                        className="w-[20px] h-[20px] flex justify-center items-center bg-danger/80 text-white rounded ms-3 hover:bg-danger disabled:bg-danger/50 disabled:cursor-not-allowed"
                                    >
                                        <IoClose />
                                    </button>

                                    <button
                                        disabled={loadingData}
                                        onClick={() => { setOpenCustomerList(true) }}
                                        className="h-[20px] px-2 flex justify-center items-center bg-secondary/80 text-white rounded ms-auto hover:bg-secondary disabled:bg-secondary/50 disabled:cursor-not-allowed"
                                    >
                                        <span className="me-2">Buscar</span>  <IoSearch />
                                    </button>
                                </div>
                                <InputText
                                    handleInputChange={handleInputChange}
                                    name="details"
                                    placeholder="Detalles:"
                                    value={data.details}
                                    disabled={loadingData}
                                />

                                <div className="border border-primary mt-3 rounded" >
                                    <button
                                        disabled={loadingData}
                                        className={paymentType === 'PAID' ? "bg-primary w-[50%] text-white" : "w-[50%] text-primary disabled:cursor-not-allowed"}
                                        onClick={() => { setPaymentType('PAID') }}
                                    >
                                        PAGADO
                                    </button>
                                    <button
                                        disabled={loadingData}
                                        className={paymentType === 'CREDIT' ? "bg-primary w-[50%] text-white" : "w-[50%] text-primary disabled:cursor-not-allowed"}
                                        onClick={() => { setPaymentType('CREDIT') }}
                                    >
                                        CREDITO
                                    </button>
                                </div>

                                {(paymentType === 'PAID') &&
                                    <>
                                        <div className="border border-success mt-2 rounded flex" >
                                            <div className="w-[50%] text-success">
                                                <span className="flex items-center justify-center"><PiMoneyDuotone className="me-2" /> COBRAR</span>
                                            </div>
                                            <span className="w-[50%] flex justify-center bg-success font-bold" > {totalAmount()} {exchangeRateFavorite.Currency.symbol} </span>
                                        </div>
                                        <div className="flex flex-col" >
                                            {paymentMethods.map(pm => {
                                                const Icon = paymentMethodIcon(pm.code);
                                                return (
                                                    <button
                                                        disabled={loadingData}
                                                        onClick={() => { setPaymentMethodId(pm.id) }}
                                                        key={pm.id}
                                                        className={`${paymentMethodId === pm.id ? 'bg-info text-white' : 'text-info'} border border-info mt-2 p-2 text-[24px] flex rounded disabled:cursor-not-allowed disabled:opacity-50`}>
                                                        <Icon />
                                                        <span className="text-[14px] ms-auto" >{pm.name}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </>
                                }
                                <button
                                    disabled={loadingData}
                                    className="text-primary text-center mb-3 border border-primary w-full rounded-full hover:text-white hover:bg-primary mt-2 disabled:cursor-not-allowed disabled:text-primary/50 disabled:border-primary/50 disabled:bg-white"
                                    onClick={() => { setOpenPurchaseSummary(true) }}
                                >
                                    Ver resumen de compra...
                                </button>
                            </div>
                        </div>
                        <div className="mt-auto flex justify-center items-center" >
                            <button
                                disabled={loadingData}
                                onClick={() => { setOpenCreateSale(false) }}
                                className="me-3 bg-danger bg-opacity-80 flex items-center rounded-full px-2 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed"
                            >
                                <FaArrowLeft /><span className="ms-2">ATRAS</span>
                            </button>

                            <button
                                disabled={loadingData}
                                onClick={createDocQuotation}
                                className="me-3 bg-info bg-opacity-80 flex items-center rounded-full px-2 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed"
                            >
                                <IoDocumentTextOutline /><span className="ms-2">COTIZAR</span>
                            </button>

                            <button
                                disabled={loadingData}
                                onClick={verifyCreateDocSale}
                                className="bg-success bg-opacity-80 flex items-center rounded-full px-2 py-1 text-white text-[14px] hover:bg-opacity-100 disabled:bg-secondary disabled:cursor-not-allowed"
                            >
                                <PiMoneyDuotone /><span className="ms-2">VENDER</span>
                            </button>

                            {loadingData && <AiOutlineLoading className="ms-2 animate-spin text-primary" />}
                        </div>
                    </>
                }


            </div>
        </>
    );
}