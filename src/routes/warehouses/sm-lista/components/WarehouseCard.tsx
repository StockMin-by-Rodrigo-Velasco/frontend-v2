import { HiOutlineInboxStack } from "react-icons/hi2";
import { dateLocalWhitTime } from "../../../../helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateWarehouse from "../windows/UpdateWarehouse";
import { Warehouse } from "../../../../interfaces";
import { loginWarehouse } from "../../../../redux/warehouses/warehousesSlice";

interface WarehouseCardProp {
    warehouse: Warehouse
}

export default function WarehouseCard({ warehouse }: WarehouseCardProp) {
    const dispatch = useDispatch<AppDispatch>();
    const [openUpdateAlmacen, setOpenUpdateAlmacen] = useState(false);

    const goToWarehouse = () => {
        dispatch(loginWarehouse(warehouse));
    }
    return (
        <>
            {openUpdateAlmacen && <UpdateWarehouse warehouse={warehouse} closeButton={() => { setOpenUpdateAlmacen(false) }} />}
            <div
                className="overflow-hidden bg-secondary flex flex-col items-center rounded m-2 w-[250px] transition-all duration-300 text-white text-[100px] hover:text-[110px]"
            >
                <div className="relative flex items-center py-1 w-full text-[16px]" >
                    <div className="text-center w-full flex flex-col" >{warehouse.name.toLocaleUpperCase()}</div>
                    <button
                        className="absolute top-1 right-1 w-7 h-7 rounded-full flex justify-center items-center transition-all duration-200 hover:bg-white hover:text-secondary"
                        onClick={() => {setOpenUpdateAlmacen(true)}}
                    >
                        <FaEdit />
                    </button>
                </div>
                <div className="w-[100px] h-[100px] flex relative items-center justify-center" >
                    <span className="absolute"><HiOutlineInboxStack /></span>
                </div>
                <div className="w-full text-start mb-2 px-3" >
                    <p className="text-[10px]" ><span>CREADO: </span>{dateLocalWhitTime(warehouse.createdAt || '')}</p>
                    <p className="text-[10px]" ><span>ÚLTIMA MODIFICACIÓN: </span>{dateLocalWhitTime(warehouse.createdAt || '')}</p>
                </div>

                <button
                    onClick={goToWarehouse}
                    className="bg-info/80 w-full hover:bg-info text-[16px]"
                >ABRIR ALMACEN</button>

            </div>
        </>
    );
}