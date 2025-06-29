import Windows from "../../../../components/Windows";
import { DocSale } from "../../../../interfaces";

interface CancelDocSaleProp {
    closeButton: () => void;
    docSale: DocSale;
}

export default function CancelDocSale({ closeButton, docSale }: CancelDocSaleProp) {

    return (
        <Windows closeButton={closeButton} tittle={`ANULACIÓN DE VENTA ${docSale.number}`} >
            <div className="p-3 w-[600px]" >
                <h1 className="bg-warning rounded px-3 font-bold" >IMPORTANTE</h1>

                <p className="px-3 text-[12px]">La <span className="font-bold">VENTA {docSale.number}</span> será anulada, lo que significa que los productos que fueron vendidos volverán al almacén de tu elección. Por favor, <span className="font-bold">verifica el almacén de destino</span> y presiona aceptar para realizar la anulación.</p>

                
            </div>
        </Windows>
    );
}