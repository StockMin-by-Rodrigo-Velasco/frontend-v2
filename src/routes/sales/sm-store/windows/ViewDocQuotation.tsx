import Windows from "../../../../components/Windows";
import { DocQuotation, initialQuotationSale } from "../../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { calculatorMultiply, dateLocalWhitTime } from "../../../../helpers";
import { useEffect, useRef, useState } from 'react';
import html2canvas from "html2canvas";
import { getDocQuotationAPI } from "../../../../redux/sales/salesThunk";
import { getBase64FromUrl, printImgB64, shareImgB64 } from "../../../../helpers/imgBase64";
import { FaPrint, FaShare } from "react-icons/fa";

interface DocQuotationProp {
  docQuotationId: string;
  closeButton: () => void;
}

export default function ViewDocQuotation({ docQuotationId, closeButton }: DocQuotationProp) {
  const { logo, data } = useSelector((s: RootState) => s.Branch);
  const { loadingData } = useSelector((s: RootState) => s.Aplication);

  const dispatch = useDispatch<AppDispatch>();

  const divRef = useRef<HTMLDivElement>(null);

  const [docSale, setDocSale] = useState<DocQuotation>(initialQuotationSale);
  const [logoB64, setLogoB64] = useState('');

  const totalAmount = (): string => {
    return docSale.ProductSale.reduce((acc, p) => { return acc + (p.quantity * parseFloat(p.price)) }, 0).toFixed(2);
  }

  const getDocQuotation = async (doc: DocQuotation) => {
    const newLogoB64 = await getBase64FromUrl(logo);
    setLogoB64(newLogoB64);
    setDocSale(doc);
  }

  const downloadPNG = async () => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current, { scale: 1.5 });
      const imgB64 = canvas.toDataURL("image/png");
      shareImgB64(imgB64);
    }
  };
  const printPNG = async() => {
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current, { scale: 1.5 });
      const imgB64 = canvas.toDataURL("image/png");
      printImgB64(imgB64);
    }
  }

  useEffect(() => {
    dispatch(getDocQuotationAPI(docQuotationId, getDocQuotation));
  }, [])
  return (
    <Windows closeButton={closeButton} tittle={`detalles de cotización número ${docSale.number}`}>
      <div className="p-3 w-[600px] relative" ref={divRef}>

        {loadingData &&
          <div className="flex bg-white rounded justify-center items-center absolute top-0 right-0 left-0 bottom-0" >
            Cargando datos de cotización...
          </div>}


        <div className="flex items-center " >
          <img src={logoB64} className="w-[300px]" />
          <div className="flex flex-col justify-end items-end ms-auto" >
            <p className="font-semibold" > Cotización Nº {docSale.number}</p>
            <p > {dateLocalWhitTime(docSale.createdAt || '')}</p>
            <p > <span className="font-semibold" >Vendedor: </span> <span className="uppercase">{docSale.User.name} {docSale.User.lastName}</span></p>
          </div>
        </div>
        {/* //* - El translate donde hay texto es para que al exportal la imagen el texto no se dezplace abajo (NO QUITAR EL TRANSLATE) */}
        <div>
          <p><span className="font-semibold translate-y-[-7px]" >Cliente: </span> <span className="translate-y-[-7px]" >{docSale.customerName.toUpperCase()}</span></p>
          <p><span className="font-semibold translate-y-[-7px]" >Detalle: </span> <span className="translate-y-[-7px]" >{docSale.details}</span></p>
        </div>

        <table className="w-full" id="tableSale">
          <thead>
            <tr className="bg-secondary/70" >
              <th className="w-[200px]"><span className="translate-y-[-7px]">NOMBRE</span></th>
              <th className="w-[50px]"><span className="translate-y-[-7px]">CANT.</span></th>
              <th className="w-[50px]"><span className="translate-y-[-7px]">U/M</span></th>
              <th className="w-[100px]"><span className="translate-y-[-7px]">PRECIO</span></th>
              <th className="w-[100px]"><span className="translate-y-[-7px]">SUBTOTAL</span></th>
            </tr>
          </thead>
          <tbody>
            {docSale.ProductSale.map(p => (
              <tr key={p.id} className="border-t border-secondary" >
                <td className="text-center"> <span className="translate-y-[-7px]">{p.Product.name.toUpperCase()}</span></td>
                <td className="text-center"> <span className="translate-y-[-7px]">{p.quantity}</span></td>
                <td className="text-center"> <span className="translate-y-[-7px]">{p.Product.UnitMeasure.abbreviation.toUpperCase()}</span></td>
                <td className="text-end"> <span className="translate-y-[-7px]">{p.price} {docSale.Currency.symbol}</span></td>
                <td className="text-end"> <span className="translate-y-[-7px]">{calculatorMultiply({ num1: p.quantity.toString(), num2: p.price })} {docSale.Currency.symbol}</span></td>
              </tr>
            ))}
            <tr className="bg-success/70 font-semibold" >
              <td colSpan={4} className="text-center" ><span className="translate-y-[-7px]">TOTAL</span></td>
              <td colSpan={1} className="text-end"><span className="translate-y-[-7px]">{totalAmount()} {docSale.Currency.symbol}</span></td>
            </tr>
          </tbody>
        </table>

        <p className="text-[12px] mt-5">
          <span className="text-secondary px-2 rounded-full translate-y-[-7px]" >Dirección: {data.address} - Contacto: {data.contact}</span>
        </p>
      </div>
      <div className="text-[12px] flex p-2 bg-secondary/50" >
        <div className="rounded-full overflow-hidden border border-info bg-info flex" >
          <div className="px-1">TIPO</div>
          <div className="bg-white px-1 font-semibold" >COTIZACIÓN</div>
        </div>

        {/* <div className={`${pendingPaymet() ? 'border-danger bg-danger' : 'border-success bg-success'} ms-2 rounded-full overflow-hidden border flex`}>
          <div className="px-1">ESTADO</div>
          <div className="bg-white px-1 font-semibold" >{docSale.isPaid ? 'SIN DEUDA' : 'PENDIENTE DE PAGO'}</div>
        </div> */}

        {/* <button
          disabled={loadingData}
          className={`border-warning/70 bg-warning/70 ms-2 rounded-full overflow-hidden border flex cursor-pointer hover:border-warning hover:bg-warning disabled:cursor-not-allowed disabled:border-secondary/70 disabled:bg-secondary/70 disabled:text-white`}>
          <div className="px-1">PAGOS</div>
          <div className="bg-white px-1 font-semibold" >{docSale.Payment.length}</div>
        </button> */}

        <button
          disabled={loadingData}
          onClick={downloadPNG}
          className="ms-auto flex justify-center items-center px-2 rounded-full border border-primary text-primary bg-white/70 hover:bg-primary hover:text-white disabled:cursor-not-allowed  disabled:bg-secondary/70 disabled:text-white disabled:border-secondary"
        >
          <FaShare className="me-2" /> COMPARTIR
        </button>
        <button
          disabled={loadingData}
          onClick={printPNG}
          className="ms-2 flex justify-center items-center px-2 rounded-full border border-primary text-primary bg-white/70 hover:bg-primary hover:text-white disabled:cursor-not-allowed  disabled:bg-secondary/70 disabled:text-white disabled:border-secondary"
        >
          <FaPrint />
        </button>
      </div>
    </Windows>
  );
}