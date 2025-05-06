// import { useEffect, useState } from "react";
// import logos from "../../../../assets/logos";
// import { InputSearch } from "../../../../components/Input";
// import Windows from "../../../../components/Windows";
// import { useForm } from "../../../../hooks";
// import { Button, ButtonColors } from "../../../../components/Buttons";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../redux/store";

// interface ArrayForm {
//     id: string;
//     productoId: string;

//     imagen: string;
//     codigo: string;
//     nombre: string;
//     marca: string;
//     categoria: string;

//     unidadMedidaAbreviada: string;
//     cantidad: string,
//     cantidadTraspaso: string,
//     show: boolean,
//     check: boolean
// }

// interface ListaProductosAlmacenProp {
//     productos: ArrayForm[],
//     closeButton: () => void;
//     almacenId: string;
//     replaceData: (data: ArrayForm[]) => void;
// }


// export default function ListaProductosAlmacen({ closeButton, productos, almacenId, replaceData }: ListaProductosAlmacenProp) {
//     const { listaAlmacenes } = useSelector((s:RootState) => s.Almacenes);

//     const { data, handleInputChange } = useForm<{ buscar: string }>({ buscar: '' });
//     const [almacenOrigen, setAlmacenOrigen] = useState('')

//     const filterProductos = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { value } = e.target;
//         const newData: ArrayForm[] = productos.map(i => (i.nombre.includes(value) || i.codigo.includes(value)) ? { ...i, show: true } : { ...i, show: false }
//         )
//         replaceData([...newData]);
//         handleInputChange(e);
//     }

//     const handleCheck = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const { checked } = e.target;
//         let newProductos = productos;
//         newProductos[index].check = checked;
//         replaceData([...newProductos]);
//     }

//     useEffect(() => {
//         replaceData([...productos.map(p=>({...p, show:true}))]);
//         const almacenSelected = listaAlmacenes.find(a => a.id === almacenId);
//         setAlmacenOrigen(almacenSelected?.nombre|| '');
//     }, [])


//     return (
//         <Windows tittle={`Lista de productos - ${almacenOrigen}`} closeButton={closeButton} >

//             <div className="p-2 flex" >
//                 <InputSearch
//                     handleInputChange={filterProductos}
//                     name="buscar"
//                     placeholder="Buscar..."
//                     value={data.buscar}
//                 />
//             </div>

//             <div className="p-2 flex flex-col max-h-[75vh] overflow-y-scroll scroll-custom">
//                 <table className="table-fixed text-left w-full border-secondary rounded overflow-hidden">
//                     <thead className="bg-secondary text-white sticky top-0" >
//                         <tr>
//                             <th className="uppercase text-center px-2 w-[80px] ">IMAGEN</th>
//                             <th className="uppercase text-center px-2 w-[80px] ">CODIGO</th>
//                             <th className="uppercase text-center px-2">NOMBRE</th>
//                             <th className="uppercase text-center px-2 w-[150px] ">MARCA</th>
//                             <th className="uppercase text-center px-2 w-[150px] ">CATEGORIA</th>
//                             <th className="uppercase text-center px-2 w-[60px] ">U/M</th>
//                             <th className="uppercase text-center px-2 w-[70px] ">CANT.</th>
//                             <th className="uppercase text-center px-2 w-[80px]">ACCION</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {productos.map((p, i) => p.show && (
//                             <tr key={p.id} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >
//                                 <td className="p-1 text-center">
//                                     <div className="flex justify-center" ><img src={p.imagen || logos.logoNoImage} className="w-14" /></div>
//                                 </td>
//                                 <td className="p-1 text-center" >
//                                     <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.codigo} </p>
//                                 </td>
//                                 <td className="p-1 text-center" >
//                                     <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.nombre} </p>
//                                 </td>
//                                 <td className="p-1 text-center" >
//                                     <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.marca} </p>
//                                 </td>
//                                 <td className="p-1 text-center" >
//                                     <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.categoria} </p>
//                                 </td>
//                                 <td className="p-1 text-center" >
//                                     <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.unidadMedidaAbreviada} </p>
//                                 </td>
//                                 <td className="p-1 text-center" >
//                                     <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded"> {p.cantidad} </p>
//                                 </td>
//                                 <td className="p-1 text-center" >
//                                     <input
//                                         type="checkbox"
//                                         disabled={parseInt(p.cantidad) <= 0}
//                                         onChange={(e) => { handleCheck(i, e) }}
//                                         checked={p.check}
//                                     />
//                                 </td>


//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>

//             </div>

//             <div className="flex justify-center py-2" >
//                 <Button className="me-2 my-1" label="Aceptar" color={ButtonColors.success} onClick={closeButton} />
//             </div>
//         </Windows>
//     );
// }