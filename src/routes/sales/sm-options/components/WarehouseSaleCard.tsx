import { HiOutlineInboxStack } from "react-icons/hi2";
import { Warehouse } from "../../../../interfaces";

interface WarehouseSaleCardProp {
    warehouse: Warehouse;
    openDetails: (warehouse:string) => void;
}


export default function WarehouseSaleCard({ warehouse, openDetails }: WarehouseSaleCardProp) {
    return (
        <div className="overflow-hidden bg-secondary flex flex-col items-center rounded m-2 w-32 transition-all duration-300 text-white text-[85px] hover:text-[90px]">
            <div className="relative flex items-center py-1 w-full text-[16px]" >
                <div className="text-center w-full flex flex-col" >
                    {warehouse.name.toLocaleUpperCase()}
                </div>
            </div>
            <div className="w-20 h-20 flex relative items-center justify-center mb-2" >
                <span className="absolute"><HiOutlineInboxStack /></span>
            </div>
            <button
                onClick={() => {openDetails(warehouse.id)}}
                className="bg-info/80 w-full hover:bg-info text-[16px]"
            >DETALLES</button>
        </div>
    );
}