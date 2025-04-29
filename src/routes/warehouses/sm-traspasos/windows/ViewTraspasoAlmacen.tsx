import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { DocTraspasoProductoAlmacen } from "../../../../interface";
import { RootState } from "../../../../redux/store";
import { InputTextareaBlock, InputTextBlock } from "../../../../components/Input";
import { dateLocal } from "../../../../helpers";
import logos from "../../../../assets/logos";


interface ViewTraspasoAlmacenProp {
    closeButton: () => void;
    traspaso: DocTraspasoProductoAlmacen;
}


export default function ViewTraspasoAlmacen({ closeButton, traspaso }: ViewTraspasoAlmacenProp) {
    const { listUsersObj, logo } = useSelector((s: RootState) => s.Branch);
    const { listaAlmacenesObj } = useSelector((s: RootState) => s.Almacenes);
    const { listaProductosObj } = useSelector((s: RootState) => s.Productos);
  

    return (
        <Windows closeButton={closeButton} tittle="DATOS DE TRASPASO">
            <div className="mb-3 p-2 flex items-center">
                <div className="flex items-center" >
                    <img src={logo} alt="logo-sucursal" width='300px' />
                </div>


                <div className="flex flex-col ms-auto" >
                    <InputTextBlock
                        name="almacenOrigenId"
                        placeholder="Origen:"
                        value={listaAlmacenesObj[traspaso.almacenOrigenId].nombre.toUpperCase()}
                    />
                    <InputTextBlock
                        name="almacenDestinoId"
                        placeholder="Destino:"
                        value={listaAlmacenesObj[traspaso.almacenDestinoId].nombre.toUpperCase()}
                    />
                </div>
                <div className="ms-auto flex flex-col" >
                    <p><span className="font-bold">Fecha: </span> {dateLocal(traspaso.createdAt)} </p>
                    <p><span className="font-bold">Responsable: </span> <span className="capitalize" >{`${listUsersObj[traspaso.usuarioId].nombre} ${listUsersObj[traspaso.usuarioId].apellido}`}</span> </p>
                    <InputTextareaBlock value={traspaso.detalle || ''} name="detalle" placeholder="Detalle" />
                </div>


            </div>
            <div className="p-2 flex flex-col max-h-[75vh] overflow-y-scroll scroll-custom mb-3">
                <table className="table-fixed text-left w-full border-secondary rounded overflow-hidden">
                    <thead className="bg-secondary text-white sticky top-0">
                        <tr>
                            <th className="uppercase text-center px-2 w-[80px]">IMAGEN</th>
                            <th className="uppercase text-center px-2 w-[80px]">CODIGO</th>
                            <th className="uppercase text-center px-2 ">NOMBRE</th>
                            <th className="uppercase text-center px-2 w-[100px]">MARCA</th>
                            <th className="uppercase text-center px-2 w-[70px]">U/M</th>
                            <th className="uppercase text-center px-2 w-[100px]">TRASPASO</th>
                        </tr>
                    </thead>

                    <tbody>
                        {traspaso.TraspasoProductoAlmacen.map(t => (
                            <tr key={t.productoId} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase text-center" >
                                <td className="p-1 text-center">
                                    <div className="flex justify-center"> <img src={listaProductosObj[t.productoId].imagen || logos.logoNoImage} className="w-14" /></div>
                                </td>
                                <td className="p-1 text-center">{listaProductosObj[t.productoId].codigo}</td>
                                <td className="p-1 text-center">{listaProductosObj[t.productoId].nombre}</td>
                                <td>{listaProductosObj[t.productoId].Marca.nombre}</td>
                                <td className="p-1 text-center">{listaProductosObj[t.productoId].UnidadMedida.abreviatura}</td>
                                <td className="p-1 text-center">{t.cantidad}</td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </Windows>
    );
}