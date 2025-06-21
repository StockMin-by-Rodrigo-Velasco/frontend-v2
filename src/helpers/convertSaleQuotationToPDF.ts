import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { QuicksandMedium } from '../assets/pdf/QuicksandMedium';
import { QuicksandRegular } from '../assets/pdf/QuicksandRegular';
import { QuicksandSemibold } from '../assets/pdf/QuicksandSemibold';

export interface DataSaleQuotationPdf {
  fileName: string;
  type: 'VENTA' | 'COTIZACION';
  tableId: string | undefined;
  number: string;
  date: string;
  customer: string;
  user: string;
  details: string;
  logoB64: string;
  branchAddress: string;
  branchContact: string;
}

export const convertSaleQuotationToPDF =async (datos: DataSaleQuotationPdf) => {
  if (datos.tableId) {

    const img = new Image();
    img.src = datos.logoB64;
    const imgWidth = 2.1; // Ancho deseado
    const aspectRatio = img.height / img.width; // Proporción de la imagen
    const imgHeight = imgWidth * aspectRatio; // Altura ajustada para mantener la proporción


    //DIVIDIR LOS ITEMS EN SUS HOJAS CORRECPONDIENTES
    const doc = new jsPDF({ //creamos el documento con unidades en PULGADAS y en tamaño CARTA
      unit: "in",
      format: 'letter'
    });
    //Cargando fuentes
    //*Nota: es importante poner "normal", en la funcion addFont, caso contrario no importa la fuente
    doc.addFileToVFS("Quicksand-Medium.ttf", QuicksandMedium);
    doc.addFont("Quicksand-Medium.ttf", "QuicksandMedium", "normal");

    doc.addFileToVFS("Quicksand-Regular.ttf", QuicksandRegular);
    doc.addFont("Quicksand-Regular.ttf", "QuicksandRegular", "normal");

    doc.addFileToVFS("Quicksand-Semibold.ttf", QuicksandSemibold);
    doc.addFont("Quicksand-Semibold.ttf", "QuicksandSemibold", "normal");

    // -------------------- ENCABEZADO --------------------

    // AGREGAMOS EL LOGO DE LA EMPRESA
    doc.addImage(datos.logoB64, 'png', 0.5, 0.2, imgWidth, imgHeight);

    //AGREGAMOS LA FECHA, MODIFICANDO EL TAMAÑO DE LA LETRA A 10px
    doc.setFontSize(10);

    doc.setFont("QuicksandSemibold");
    doc.text(`${datos.type} Nº ${datos.number}`, 4.2, 0.5);

    doc.setFont("QuicksandSemibold");
    doc.text('Fecha: ', 4.2, 0.9);
    doc.setFont("QuicksandRegular");
    doc.text(`${datos.date}`, 5.2, 0.9);

    doc.setFont("QuicksandSemibold");
    doc.text('Responsable: ', 4.2, 1.1);
    doc.setFont("QuicksandRegular");
    doc.text(`${datos.user}`, 5.2, 1.1);

    doc.setFont("QuicksandSemibold");
    doc.text('Cliente: ', 4.2, 1.3);
    doc.setFont("QuicksandRegular");
    doc.text(`${datos.customer}`, 5.2, 1.3);

    doc.setFont("QuicksandSemibold");
    doc.text('Detalle: ', 0.6, 1.6);
    doc.setFont("QuicksandRegular");
    doc.text(`${datos.details}`, 1.3, 1.6, { maxWidth: 7 });
    // -------------------- FIN ENCABEZADO --------------------

    // -------------------- TABLA --------------------
    autoTable(doc, {
      startY: 1.9,
      pageBreak: 'auto',
      headStyles: {
        fillColor: '#093D77',
        lineWidth: 0,
        cellPadding: { top: 0.04, right: 0.04, bottom: 0.04, left: 0.04 },
        fontStyle: 'normal',
        font: 'QuicksandSemibold',
        fontSize: 8,
      },
      bodyStyles: {
        cellPadding: { top: 0.04, right: 0.04, bottom: 0.04, left: 0.04 },
        font: 'QuicksandRegular',
        fontSize: 8,
      },
      footStyles: {
        fillColor: '#DEDEDE',
        textColor: '#000000',
        fontStyle: 'normal',
        lineColor: '#DEDEDE',
        lineWidth: 0,
        cellPadding: { top: 0.04, right: 0.04, bottom: 0.04, left: 0.04 },
        font: 'QuicksandSemibold',
        fontSize: 8,
      },
      html: `#${datos.tableId}`
    });

    // -------------------- PIE DE PAGINA --------------------
    doc.setDrawColor(9, 61, 119); // COLOR PRIMARY
    doc.setLineWidth(0.02); // Grosor de la línea
    doc.line(0.5, 5.8, 8, 5.8);

    doc.setFont("QuicksandSemibold");
    doc.text('DIRECCION', 0.5, 6);
    doc.setFont("QuicksandRegular");
    doc.text(datos.branchAddress, 0.5, 6.2);
    doc.setFont("QuicksandSemibold");
    doc.text('CONTACTO', 6, 6);
    doc.setFont("QuicksandRegular");
    doc.text(`${datos.branchContact}`, 6, 6.2);
    // -------------------- FIN PIE DE PAGINA -------------------- 

    // -------------------- FIN TABLA --------------------         
    doc.save(`${datos.fileName}.pdf`);


  } else {
    console.log('No se agrego ningun archivo...');
  }

}