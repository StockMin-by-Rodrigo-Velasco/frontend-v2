import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { QuicksandMedium } from '../assets/pdf/QuicksandMedium';
import { QuicksandRegular } from '../assets/pdf/QuicksandRegular';
import { QuicksandSemibold } from '../assets/pdf/QuicksandSemibold';

interface datosPdf{
    fileName: string;
    tableId: string | undefined;
    numero: string;
    fecha: string;
    cliente: string;
    responsable: string;
    detalle: string;
    logo: string;
  }

export const generateCotizacionVentaPdf = ( datos: datosPdf ) => {
    if( datos.tableId ){

        const img = new Image();
        img.src = datos.logo;
        const imgWidth = 2.1; // Ancho deseado
        const aspectRatio = img.height / img.width; // Proporción de la imagen
        const imgHeight = imgWidth * aspectRatio; // Altura ajustada para mantener la proporción


        //DIVIDIR LOS ITEMS EN SUS HOJAS CORRECPONDIENTES
      const doc = new jsPDF({ //creamos el documento con unidades en PULGADAS y en tamaño LEGAL
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
      doc.addImage(datos.logo, 'png', 0.5, 0.2, imgWidth, imgHeight );

      //AGREGAMOS LA FECHA, MODIFICANDO EL TAMAÑO DE LA LETRA A 12px
      doc.setFontSize(10);
           
      doc.setFont("QuicksandSemibold");
      doc.text( 'Fecha: ', 4.2, 0.5);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.fecha }`, 5.2, 0.5 );

      doc.setFont("QuicksandSemibold");
      doc.text( 'Responsable: ', 4.2, 0.7);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.responsable }`, 5.2, 0.7 );

      doc.setFont("QuicksandSemibold");
      doc.text( 'Cliente: ', 4.2, 0.9);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.cliente }`, 5.2, 0.9 );

      doc.setFont("QuicksandSemibold");
      doc.text( 'Detalle: ', 0.6, 1.6);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.detalle }`, 1.3, 1.6, {maxWidth: 7} );
      // -------------------- FIN ENCABEZADO --------------------
      
      // -------------------- TABLA --------------------
      autoTable(doc, {
        startY: 1.9,
        headStyles: { 
          fillColor: '#093D77', 
          lineWidth:0, 
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
      // -------------------- FIN TABLA --------------------         
      doc.save(`${datos.fileName}`);


    }else{
        console.log('No se agrego ningun archivo...');
    }

}