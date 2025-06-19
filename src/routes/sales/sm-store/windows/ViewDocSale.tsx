import { useEffect } from "react";
import Windows from "../../../../components/Windows";
import { DocSale } from "../../../../interfaces";

interface DocSaleProp{
    docSale: DocSale;
    closeButton: () => void;

}

export default function ViewDocSale({docSale, closeButton}:DocSaleProp) {
  useEffect(() => {
    console.log(docSale)
  }, [])
  
  return (
    <Windows closeButton={closeButton} tittle={`detalles de venta número 0000`}>
      <h1>Hello Page</h1>
    </Windows>
  );
}