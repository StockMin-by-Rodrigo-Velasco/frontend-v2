import { BsFillTrashFill } from "react-icons/bs";
import logos from "../assets/logos";

// export enum FormTableColumnTypes {
//     IMG,
//     INPUT,
//     CHECK,
//     P,
//     INPUTNUM,
//     SELECT,
// }

export interface FormTableColumn<T> {
    width?: string;
    name: string,
    type: 'img'|'text'|'number'|'check'|'p-block';
    key: keyof T;
}

interface FormTableProp<T> {
    arrayData: T[],
    columns: FormTableColumn<T>[];
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    removeData?: { name: string, action: (index: number) => void, width?: string };
    getData?: (data: T[]) => void;
    tableFixed?: boolean;
}

export default function FormTable<T>({ arrayData, columns, handleInputChange, removeData, tableFixed}: FormTableProp<T>) {
    return (
        <table className={`${tableFixed? 'table-fixed':'table-auto'} text-left w-full border-secondary rounded overflow-hidden`}>
            <thead className="bg-secondary text-white sticky top-0" >
                <tr>
                    {columns.map(c => (
                        <th key={c.name} className={`${c.width? c.width:''} uppercase text-center px-2`}>{c.name}</th>
                    ))}
                    {removeData?.name &&
                        <th className={`${removeData.width? removeData.width:''} uppercase text-center px-2`}>{removeData.name}</th>
                    }
                </tr>
            </thead>

            <tbody>
                {arrayData.map((f, indexFil) => (
                    <tr key={indexFil} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                        {columns.map((c, i) => (
                            <td key={i} className="p-1 text-center" >
                                {c.type === 'img' && <div className="flex justify-center" ><img src={(f[c.key] as string) || logos.logoNoImage} className="w-14" /></div>}
                                {c.type === 'text' &&
                                    <input
                                        onChange={handleInputChange}
                                        className="border-secondary border-[1px] rounded w-full p-1 focus:outline-none"
                                        type="text"
                                        name={`${c.key as string}:${indexFil}`}
                                        id={`${c.key as string}:${indexFil}`}
                                        value={f[c.key] as string} />
                                }
                                {c.type === 'number' &&
                                    <input
                                        onChange={handleInputChange}
                                        className="border-secondary border-[1px] rounded max-w-[100px] p-1 focus:outline-none"
                                        type="number"
                                        name={`${c.key as string}:${indexFil}`}
                                        id={`${c.key as string}:${indexFil}`}
                                        value={f[c.key] as string} />
                                }
                                {c.type === 'p-block' &&
                                    <p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{f[c.key] as string}</p>
                                }
                            </td>
                        ))}
                        {removeData?.name &&
                            <td className="text-center text-secondary" >
                                <button type="button" className="bg-danger/80 p-1 rounded-full  text-white hover:bg-danger" onClick={() => { removeData.action(indexFil) }} ><BsFillTrashFill/></button>
                            </td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
}