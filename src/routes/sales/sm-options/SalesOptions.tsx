import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import WarehouseSaleCard from "./components/WarehouseSaleCard";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import ToggleWarehouseSale from './windows/ToggleWarehouseSale';
import CreateUserWarehouseSale from "./windows/CreateUserWarehouseSale";

export default function SalesOptions() {
    const { warehouses } = useSelector((s: RootState) => s.Warehouses);

    const [openToggleWarehouseSale, setOpenToggleWarehouseSale] = useState(false);
    const [openCreateUserWarehouseSale, setOpenCreateUserWarehouseSale] = useState(false);

    const [warehouseId, setWarehouseId] = useState<string>('');

    const openWarehouseSaleDetails = (id:string) => {
        setWarehouseId(id);
        setOpenCreateUserWarehouseSale(true);
    }

    return (
        <>
            {openToggleWarehouseSale && <ToggleWarehouseSale closeButton={() => { setOpenToggleWarehouseSale(false) }} />}
            {openCreateUserWarehouseSale && <CreateUserWarehouseSale closeButton={() => { setOpenCreateUserWarehouseSale(false) }} warehouseId={warehouseId} />}

            <h1 className=" flex items-center text-[30px] text-secondary border-b-2 border-secondary mb-5">
                ALMACENES DE VENTA
            </h1>
            <div className="flex flex-wrap justify-normal items-center">
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

        </>
    );
}