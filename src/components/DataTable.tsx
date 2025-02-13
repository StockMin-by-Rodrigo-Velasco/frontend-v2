import { BsBoxArrowInUpRight } from "react-icons/bs";

export enum DataTableColumnTypes {
    IMG,
    P
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
}

export default function DataTable<T,>({ data, columns, details }: DataTablePropInterface<T>) {

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

                    <tr key={i} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1" >
                        {columns.map((c, i) => (
                            <td key={i} className={c.type === DataTableColumnTypes.P ? "py-2 text-center" : "py-2 flex justify-center"} >
                                {c.type === DataTableColumnTypes.IMG && <img src={f[c.key] as string} className="w-14" />}
                                {c.type === DataTableColumnTypes.P && <p>{f[c.key] as string}</p>}
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