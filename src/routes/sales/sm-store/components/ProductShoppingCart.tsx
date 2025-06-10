import { BiTrash } from "react-icons/bi";
import logos from "../../../../assets/logos";
import { ProductCart } from "../../../../interfaces/formInterface";
import { InputNumber } from "../../../../components/Input";
import { TiWarning } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

interface ProductShoppingCartProp {
    index:number;
    product: ProductCart;
    toggleProduct:(productId: string) => void;
    handleShoppingCart: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}
export default function ProductShoppingCart({ index, product, toggleProduct, handleShoppingCart }: ProductShoppingCartProp) {

    const {exchangeRateFavorite} = useSelector((s:RootState) => s.Sales);


    return (
        <div className="flex items-center" >
            <div className="flex justify-center items-center h-[45px] w-[45px] overflow-hidden" >
                <img src={product.Product.image || logos.logoNoImage} alt={product.Product.name} className="object-contain w-full h-full" />
            </div>
            <div className="ms-2 w-36">
                <h1 className="uppercase font-medium text-[14px]" >{product.Product.name}</h1>
                <h2 className="uppercase text-[12px]" >{product.Product.code}</h2>
            </div>
            <span className={`${(product.quantityCart > product.quantity)? 'opacity-100':'opacity-0'} ms-auto text-warning`} ><TiWarning /></span>
            <InputNumber
            className="ms-2 w-[85px]"
            handleInputChange={handleShoppingCart}
            name={`quantityCart:${index}`}
            placeholder={`Cant. (${product.Product.UnitMeasure.abbreviation.toUpperCase()})`}
            value={product.quantityCart.toString()}
            />
            <InputNumber
            className="ms-2 w-[105px]"
            handleInputChange={handleShoppingCart}
            name={`priceCart:${index}`}
            placeholder={`Precio (${exchangeRateFavorite.Currency.symbol})`}
            value={product.priceCart}
            step="0.01"
            />
            <button 
                className="bg-danger p-1 text-white rounded ms-2 opacity-60 hover:opacity-100"
                onClick={() => {toggleProduct(product.Product.id)}}
            >
                <BiTrash/>
            </button>            
        </div>
    );
}