import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { CancelDocSaleDto, DocSale, IncrementProductDto, ProductWarehouse } from "../../../../interfaces";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useForm } from "../../../../hooks";
import { InputSelect } from "../../../../components/Input";
import { Button } from '../../../../components/Buttons';
import { getSimpleProductsWarehouseAPI } from "../../../../redux/warehouses/warehousesThunk";
import { useState } from "react";
import { cancelDocSaleAPI } from "../../../../redux/sales/salesThunk";


interface CancelDocSaleProp {
    closeButton: () => void;
    docSale: DocSale;
    completeCalcellation: (docSaleId: string) => void;
    setDocSale: (value: React.SetStateAction<DocSale>) => void;
}

export default function CancelDocSale({ closeButton, docSale, completeCalcellation, setDocSale}: CancelDocSaleProp) {
    const { warehouses } = useSelector((s: RootState) => s.Warehouses);
    const dispatch = useDispatch<AppDispatch>()

    const { data: warehoueSelected, handleInputChange } = useForm<{ id: string }>({ id: "" });

    const [verifyProducts, setVerifyProducts] = useState<'LOADING'|'ERROR'|'SUCCESS'|'NONE'>("NONE");
    const [productsReturn, setProductsReturn] = useState<IncrementProductDto[]>([])

    const verifyProductReturn = (productsWarehouse: ProductWarehouse[]) => {
        const productsWarehouseId = productsWarehouse.reduce( (acc, p) => {acc[p.Product.id] = p.id; return acc}, {} as Record<string, string> );
        const newProductReturn: IncrementProductDto[] = [];
        
        for (let i = 0; i < docSale.ProductSale.length; i++) {
            const p = docSale.ProductSale[i];
            
            if(productsWarehouseId[p.Product.id]) newProductReturn.push({
                productWarehouseId: productsWarehouseId[p.Product.id],
                quantity:p.quantity
            });
            else {
                setVerifyProducts("ERROR");
                return;
            }
        }
        // console.log(newProductReturn);
        // console.log(productsWarehouse)
        setVerifyProducts("SUCCESS");
        setProductsReturn([...newProductReturn]);
    }

    const cancelDocSale = () => {
        const cancelDocSaleDto: CancelDocSaleDto = {docSaleId: docSale.id, productsSale: productsReturn}
        dispatch(cancelDocSaleAPI(cancelDocSaleDto, (doc: DocSale) => {completeCalcellation(doc.id); setDocSale(s=>({...s, canceled:true})); closeButton()}));
    }

    return (
        <Windows closeButton={closeButton} tittle={`ANULACIÓN DE VENTA ${docSale.number}`} >
            <div className="p-3 w-[600px]" >
                <h1 className="bg-warning rounded px-3 font-bold" >IMPORTANTE</h1>

                <p className="px-3 text-[12px]">La <span className="font-bold">VENTA {docSale.number}</span> será anulada, lo que significa que los productos que fueron vendidos volverán al almacén de tu elección. Por favor, <span className="font-bold">verifica el almacén de destino</span> y presiona aceptar para realizar la anulación.</p>

                <div className="flex items-end w-full mt-2" >
                    <InputSelect
                        optionDefault="Sin almacén de destino"
                        className="me-auto w-96"
                        placeholder="Almacén de destino:"
                        handleInputChange={(e) => {
                            handleInputChange(e); 
                            if(e.target.value !== ''){
                                dispatch(getSimpleProductsWarehouseAPI(e.target.value, verifyProductReturn));
                                setVerifyProducts("LOADING"); 
                            }else setVerifyProducts("NONE");
                        }}
                        name="id"
                        options={warehouses.map(w => ({ name: w.name, value: w.id }))}
                        value={warehoueSelected.id}
                    />
                    <div>
                        <Button color="success" label="Aceptar" onClick={cancelDocSale} loading={verifyProducts==="NONE"||verifyProducts==="ERROR"||verifyProducts==="LOADING"}/>
                    </div>
                </div>
                {verifyProducts === "NONE"&&<span className="text-secondary text-[12px]" >Selecciona un almacén para comprobar la devolución exitosa de los productos.</span>}
                {verifyProducts === "LOADING"&&<span className="text-secondary text-[12px]" >Comprobando productos…</span>}
                {verifyProducts === "SUCCESS"&&<span className="text-success text-[12px]" >No se encontraron problemas en el proceso de devolución.</span>}
                {verifyProducts === "ERROR"&&<span className="text-danger text-[12px]">Los productos de la venta aun no se encuentran registrados en el almacén de destino.</span>}
            </div>
        </Windows>
    );
}