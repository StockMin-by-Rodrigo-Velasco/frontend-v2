import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import WarehouseSaleCard from "./components/WarehouseSaleCard";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import ToggleWarehouseSale from './windows/ToggleWarehouseSale';
import CreateUserWarehouseSale from "./windows/CreateUserWarehouseSale";
import { MdCurrencyExchange } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import ExchangeRateCard from './components/ExchangeRateCard';
import CreateExchangeRate from "./windows/CreateExchangeRate";
import UpdateExchangeRate from "./windows/UpdateExchangeRate";
import { ExchangeRate, initialExchangeRate } from "../../../interfaces";

export default function SalesOptions() {
    const { warehouses } = useSelector((s: RootState) => s.Warehouses);
    const { exchangeRates } = useSelector((s: RootState) => s.Sales);

    const [updateExchangeRate, setUpdateExchangeRate] = useState<ExchangeRate>(initialExchangeRate);

    const [openToggleWarehouseSale, setOpenToggleWarehouseSale] = useState(false);
    const [openCreateUserWarehouseSale, setOpenCreateUserWarehouseSale] = useState(false);
    const [openCreateExchangeRate, setOpenCreateExchangeRate] = useState(false);
    const [openUpdateExchangeRate, setOpenUpdateExchangeRate] = useState(false);

    const [warehouseId, setWarehouseId] = useState<string>('');

    const openExchangeRate = (er: ExchangeRate) => {
        setUpdateExchangeRate(er);
        setOpenUpdateExchangeRate(true);
    }
    const openWarehouseSaleDetails = (id: string) => {
        setWarehouseId(id);
        setOpenCreateUserWarehouseSale(true);
    }

    return (
        <>
            {openToggleWarehouseSale && <ToggleWarehouseSale closeButton={() => { setOpenToggleWarehouseSale(false) }} />}
            {openCreateUserWarehouseSale && <CreateUserWarehouseSale closeButton={() => { setOpenCreateUserWarehouseSale(false) }} warehouseId={warehouseId} />}
            {openCreateExchangeRate && <CreateExchangeRate closeButton={() => setOpenCreateExchangeRate(false)} />}
            {openUpdateExchangeRate && <UpdateExchangeRate closeButton={() => setOpenUpdateExchangeRate(false)} exchangeRate={updateExchangeRate} />}

            <h1 className="flex items-center text-[18px] text-white bg-secondary px-2 rounded">
                <span className="me-2"><AiOutlineShop /></span>ALMACENES DE VENTA
            </h1>
            <div className="text-[14px] mb-5 px-5 text-secondary">
                <p>Agrega o modifica los almacenes de tu sucursal que estarán disponibles para las ventas. Al ingresar a los detalles de tu almacén podrás agregar vendedores o quitarlos. Ten en cuenta que es importante registrar por lo menos un almacén de ventas para realizar las mismas. Al hacer una venta solo se descontarán las unidades vendidas del almacén seleccionado.
                </p>
                <p>Los usuarios que no estén registrados como vendedores no podrán ver los productos para realizar ventas ni cotizaciones.</p>
            </div>

            <div className="flex flex-wrap justify-normal items-center mb-5">
                <div
                    onClick={() => { setOpenToggleWarehouseSale(true) }}
                    className="m-2 w-10 h-10 flex justify-center items-center border-2 opacity-70 border-secondary rounded p-2 text-secondary transition-all duration-200 hover:text-[20px] hover:opacity-100 cursor-pointer"
                >
                    <FaPlus />
                </div>

                {warehouses.map(w => (w.warehouseSale &&
                    <WarehouseSaleCard key={w.id} warehouse={w} openDetails={openWarehouseSaleDetails} />
                ))}
            </div>

            <h1 className="flex items-center text-[18px] text-white bg-secondary px-2 rounded">
                <span className="me-2"><MdCurrencyExchange /></span>TIPO DE CAMBIO
            </h1>
            <div className="text-[14px] mb-5 px-5 text-secondary">
                <p>Stockmin utiliza el dólar estadounidense (USD) como moneda principal, sin embargo, puedes usar otros tipos de monedas ingresando su respectiva conversión. De esta forma, y aunque tus productos tengan precios en USD se realizara su respectiva conversión a la moneda de tu preferencia.
                </p>
            </div>

            <div className="flex flex-wrap justify-normal items-center mb-5">
                <div
                    onClick={() => setOpenCreateExchangeRate(true)}
                    className="m-2 w-10 h-10 flex justify-center items-center border-2 opacity-70 border-secondary rounded p-2 text-secondary transition-all duration-200 hover:text-[20px] hover:opacity-100 cursor-pointer"
                >
                    <FaPlus />
                </div>
                {
                    exchangeRates.map(er => (
                        <ExchangeRateCard key={er.id} exchangeRate={er} openExchangeRate={openExchangeRate} />
                    ))
                }

            </div>




        </>
    );
}