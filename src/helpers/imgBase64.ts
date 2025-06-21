export const getBase64FromUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const shareImgB64 = async (imgB64: string) => {
  const date = Date.now().toString();
  try {
    const blob = await (await fetch(imgB64)).blob();
    const file = new File([blob], `${date}.png`, { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Imagen generada",
        text: "¡Mira esta imagen!",
      });
    } else {
      alert("Tu navegador no admite compartir imágenes.");
    }
  } catch (error) {
    console.error("Error al compartir:", error);
  }
};

export const printImgB64 = (dataUrl: string) => {
  const ventana = window.open('', '_blank');
  if (!ventana) return;

  ventana.document.write(`
    <html>
      <head>
        <title>Imprimir</title>
        <style>
          @page {
            margin: 0;
          }
          body {
            margin: 0;
            padding: 20px;
            background: white;
          }
          img {
            display: block;
            width: 100%;
            height: auto;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        <img src="${dataUrl}" />
      </body>
    </html>
  `);

  ventana.document.close();
};
