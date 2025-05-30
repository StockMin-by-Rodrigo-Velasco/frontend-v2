import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { CreateUserWarehouseSaleDto, initialWarehouse, Warehouse } from "../../../../interfaces";
import { AppDispatch, RootState } from "../../../../redux/store";
import { perfilColor, perfilImg } from "../../../../assets/profile";
import { FaArrowRight } from "react-icons/fa";
import { createUserWarehouseSaleAPI, deleteUserWarehouseSaleAPI } from "../../../../redux/sales/salesThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

interface CreateUserWarehouseSaleProp {
    closeButton: () => void;
    warehouseId: string
}

export default function CreateUserWarehouseSale({ warehouseId, closeButton }: CreateUserWarehouseSaleProp) {
    const { users } = useSelector((s: RootState) => s.Branch);
    const { warehouses } = useSelector((s: RootState) => s.Warehouses);
    const { loadingData } = useSelector((s: RootState) => s.Aplication);

    const [warehouse, setWarehouse] = useState<Warehouse>(initialWarehouse);

    const dispatch = useDispatch<AppDispatch>();

    const createUserWarehouseSale = (userId: string) => {
        const createUserWarehouseSaleDto: CreateUserWarehouseSaleDto = { warehouseId: warehouse.id, userId };
        dispatch(createUserWarehouseSaleAPI(createUserWarehouseSaleDto));
    }
    const deleteUserWarehouseSale = (userId: string) => {
        dispatch(deleteUserWarehouseSaleAPI(userId));
    }

    useEffect(() => {
      const warehouseSelected = warehouses.find(w => w.id === warehouseId);
      if(warehouseSelected) setWarehouse(warehouseSelected)
    }, [warehouses])
    

    return (
        <Windows closeButton={closeButton} tittle="DETALLES DEL ALMACÉN DE VENTAS" >
            <div className="m-2" >
                <h1 className="font-medium uppercase text-white bg-secondary rounded px-2" >{warehouse.name}</h1>
                <p className="text-[14px] px-2 text-secondary">{warehouse.description}</p>
            </div>

            <div className="max-h-[70vh] overflow-y-scroll scroll-custom ps-2 mb-2 flex">
                <div className="mx-2">
                    <h1 className="font-medium uppercase text-white bg-secondary rounded px-2" >USUARIOS</h1>
                    {users.map(u => (!u.warehouseId &&
                        <div key={u.id} className="rounded shadow-lg flex items-center my-2">
                            <div style={{ backgroundColor: perfilColor(u.profile.split(' ')[1]) }} className="rounded">
                                <img src={perfilImg(u.profile.split(' ')[0])} width={'45px'} />
                            </div>
                            <div className="mx-3" >
                                <p className="font-medium" >{u.name} {u.lastName}</p>
                                <p className="text-[12px]" >CI: {u.ci}</p>
                            </div>
                            <button
                                onClick={() => createUserWarehouseSale(u.id)}
                                disabled={loadingData}
                                className="w-5 h-5 flex justify-center items-center rounded-full ms-auto bg-success opacity-70 text-white hover:opacity-100 disabled:bg-secondary">
                                {loadingData ? <AiOutlineLoading className="animate-spin" /> : <FaArrowRight />}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mx-2">
                    <h1 className="font-medium uppercase text-white bg-secondary rounded px-2" >VENDEDORES</h1>
                    {warehouse.User.map(u => (
                        <div key={u.id} className="rounded shadow-lg flex my-2 items-center">
                            <div style={{ backgroundColor: perfilColor(u.profile.split(' ')[1]) }} className="rounded">
                                <img src={perfilImg(u.profile.split(' ')[0])} width={'45px'} />
                            </div>
                            <div className="mx-3" >
                                <p className="font-medium" >{u.name} {u.lastName}</p>
                                <p className="text-[12px]" >CI: {u.ci}</p>
                            </div>
                            <button
                                onClick={() => deleteUserWarehouseSale(u.id)}
                                disabled={loadingData}
                                className="w-5 h-5 flex justify-center items-center rounded-full ms-auto bg-danger opacity-70 text-white hover:opacity-100 disabled:bg-secondary">
                                {loadingData ? <AiOutlineLoading className="animate-spin" /> : <IoClose />}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </Windows>
    );
}