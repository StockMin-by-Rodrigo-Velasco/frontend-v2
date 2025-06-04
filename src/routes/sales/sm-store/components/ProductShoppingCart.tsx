import { BiTrash } from "react-icons/bi";
import logos from "../../../../assets/logos";
import { ProductWarehouse } from "../../../../interfaces";

interface ProductShoppingCartProp {
    product: ProductWarehouse;
    toggleProduct:(productId: string) => void
}


export default function ProductShoppingCart({ product, toggleProduct }: ProductShoppingCartProp) {
    return (
        <div className="flex items-center" >
            <div className="flex justify-center items-center h-[60px] w-[60px] overflow-hidden" >
                <img src={product.Product.image || logos.logoNoImage} alt={product.Product.name} className="object-contain w-full h-full" />
            </div>
            <div className="ms-2">
                <h1 className="uppercase font-medium text-[14px]" >{product.Product.name}</h1>
                <h2 className="uppercase text-[12px]" >{product.Product.code}</h2>
            </div>
            <button 
                className="bg-danger p-1 text-white rounded ms-auto opacity-60 hover:opacity-100"
                onClick={() => {toggleProduct(product.Product.id)}}
            >
                <BiTrash/>
            </button>            
        </div>
    );
}