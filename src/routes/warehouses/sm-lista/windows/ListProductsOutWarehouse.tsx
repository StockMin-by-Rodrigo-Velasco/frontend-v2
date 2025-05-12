import { IoSearch } from "react-icons/io5";
import Windows from "../../../../components/Windows";
import logos from "../../../../assets/logos";
import { FaCheckCircle } from "react-icons/fa";


interface ProductForm {
    productId: string;
    code: string;
    name: string;
    image?: string;
    quantity: string;
    minQuantity: string;

    categoryId: string;
    categoryName?: string;

    brandId: string;
    brandName?: string;

    unitMeasureId: string;
    unitMeasureAbbreviation?: string;

    registered: boolean;
    selected: boolean;
    show: boolean;
}

interface ListProductsOutWarehouseProp {
    closeButton: () => void;
    products: ProductForm[]
    setProducts: React.Dispatch<React.SetStateAction<ProductForm[]>>;
    checkProduct: (productId: string, e?: React.ChangeEvent<HTMLInputElement>) => void
}


export default function ListProductsOutWarehouse({ closeButton, products, setProducts, checkProduct }: ListProductsOutWarehouseProp) {
    const filterProductos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newData: ProductForm[] = products.map(i => (i.name.includes(value) || i.code.includes(value)) ? { ...i, show: true } : { ...i, show: false }
        )
        setProducts([...newData]);
    }

    return (
        <Windows tittle="Productos disponibles" closeButton={closeButton} >
            <div className="flex py-2" >
                <div className="p-2 w-[300px] me-auto">
                    <div className={` flex items-center rounded-full border-[1px] border-primary px-2`}>
                        <input
                            className="w-full focus:outline-none"
                            type="search"
                            onChange={filterProductos}
                            name='buscar'
                            id='buscar'
                            placeholder='Buscar...'
                        />
                        <label
                            htmlFor='buscar'
                            className="text-primary cursor-text"
                        >
                            <IoSearch />
                        </label>
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-[75vh] overflow-y-scroll scroll-custom ps-2" >
                <table className="table-fixed w-full text-left border-secondary rounded overflow-hidden">
                    <thead className="bg-secondary text-white sticky top-0" >
                        <tr>
                            <th className="w-20 text-center">IMAGEN</th>
                            <th className="w-36 text-center">CODIGO</th>
                            <th className="w-40 text-center">NOMBRE</th>
                            <th className="w-20 text-center">MARCA</th>
                            <th className="w-28 text-center">CATEGORIA</th>
                            <th className="w-10" ><div className="flex justify-center"><FaCheckCircle /></div></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p, indexFil) => p.show && (
                            <tr key={indexFil} className="border-b-[1px] border-secondary/50 hover:bg-secondary-1 uppercase">
                                <td className="p-1 text-center">
                                    <div className="flex justify-center" ><img src={p.image || logos.logoNoImage} className="w-14" /></div>
                                </td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.code}</p></td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.name}</p></td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.brandName}</p></td>
                                <td><p className="bg-secondary-1/50 border-secondary text-secondary border-[1px] py-1 px-2 rounded">{p.categoryName}</p></td>
                                <td>
                                    {p.registered ?
                                        <div className="text-success flex justify-center w-full"><FaCheckCircle /></div>
                                        :
                                        <div className="flex justify-center" >
                                            <input
                                                type="checkbox"
                                                onChange={(e) => { checkProduct(p.productId, e) }}
                                                name={p.productId}
                                                id={p.productId}
                                                checked={p.selected}
                                            />
                                        </div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* 
            <div className="flex justify-center py-3">
                <Button label="Aceptar" color="success" onClick={closeButton}/>
            </div> */}

        </Windows>
    );
}