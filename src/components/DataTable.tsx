import { BsBoxArrowInUpRight } from "react-icons/bs";
import logos from "../assets/logos";
import { dateLocalWhitTime } from "../helpers";

export enum DataTableColumnTypes {
    IMG,
    P,
    DATE,
    ALERT //Compara un valor numerico con otro para generar el estado de alerta
}

export interface DataTableColumnInterface<T> {
    name: string,
    type: DataTableColumnTypes;
    key: keyof T;
}

interface DataTablePropInterface<T> {
    data: T[],
    columns: DataTableColumnInterface<T>[];
    details?: { name: string, action: (data: T) => void }; //Devuelve los datos de la fila seleccionada
    compareAlert?: keyof T //Valor para comparar la columna del tipo alerta
}

export default function DataTable<T,>({ data, columns, details, compareAlert }: DataTablePropInterface<T>) {

    return (
        <table className="table-auto w-full text-left" >
            <thead className="bg-primary text-white sticky top-0">
                <tr>
                    {columns.map(c => (
                        <th key={c.name} className="uppercase text-center">{c.name}</th>
                    ))}
                    {details?.name &&
                        <th className="uppercase text-center">{details.name}</th>
                    }
                </tr>
            </thead>
            <tbody>
                {data.map((f, i) => (
                    <tr key={i} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase" >
                        {columns.map((c, i) => (
                            <td key={i} className={c.type === DataTableColumnTypes.P ? "py-2 text-center" : "py-2"} >
                                {c.type === DataTableColumnTypes.IMG && <div className="flex justify-center" ><img src={(f[c.key] as string) || logos.logoNoImage} className="w-14" /></div>}
                                {c.type === DataTableColumnTypes.P && <p>{f[c.key] as string}</p>}
                                {/* {c.type === DataTableColumnTypes.DATE &&
                                    // <p>{new Date((f[c.key] as number)).toLocaleDateString("es-ES", { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</p>
                                    <p> {f[c.key as string]} </p>
                                } */}
                                {c.type === DataTableColumnTypes.DATE && <p>{dateLocalWhitTime((f[c.key] as string))}</p>}
                                {(c.type === DataTableColumnTypes.ALERT)&&
                                <>{compareAlert?
                                    <>{(((typeof f[c.key]) === 'number') && ((typeof f[compareAlert]) === 'number') && ((f[c.key] as number) > 0) && ((f[c.key] as number) > 0)) ?
                                        <div className="w-full h-full flex justify-center items-center">
                                        {/* compareAlert = cantidad VS c.key = cantidadMin */}
                                        {((f[compareAlert] as number) > ((f[c.key] as number)*2)) && <div className="bg-success rounded h-5 w-2"></div>}
                                        {( ((f[compareAlert] as number) <= ((f[c.key] as number)*2)) && ((f[compareAlert] as number) > ((f[c.key] as number))) ) && <div className="bg-warning rounded h-5 w-2"></div>}
                                        {((f[compareAlert] as number) <= ((f[c.key] as number))) && <div className="bg-danger rounded h-5 w-2"></div>}
                                        </div>
                                        :
                                        <div className="w-full h-full flex justify-center items-center">
                                            <div className="bg-secondary rounded h-5 w-2" ></div>
                                        </div>
                                    }
                                    </>
                                    :
                                    <div className="w-full h-full flex justify-center items-center">
                                        <div className="bg-secondary rounded h-5 w-2" ></div>
                                    </div>
                                }</>
                                }
                            </td>
                        ))}
                        {details?.name &&
                            <td className="text-center text-secondary" >
                                <button type="button" onClick={() => { details.action(f) }} ><BsBoxArrowInUpRight /></button>
                            </td>
                        }
                    </tr>

                ))}
            </tbody>
        </table>
    );
}