import logos from "../../../../assets/logos";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { MdShoppingCart } from "react-icons/md";
import { useState } from "react";
import { useForm } from "../../../../hooks";

import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { ProductStore } from "../../../../interfaces/formInterface";
import { updateProductPriceAPI } from "../../../../redux/sales/salesThunk";
import { calculatorDivide } from "../../../../helpers/calculator";


interface ProductCardProp {
    product: ProductStore,
    toggleProduct:(productId: string) => void
}


export default function ProductCard({ product, toggleProduct }: ProductCardProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { exchangeRateFavorite } = useSelector((s: RootState) => s.Sales);

    const dispatch = useDispatch<AppDispatch>();

    const [editPrice, setEditPrice] = useState(false);

    const { data: formPrice, handleInputChange, resetData } = useForm<{ price: string }>({ 
        price: (product.Product.price && (product.Product.price !== '')) ? product.Product.price : '0' }
    );

    const updatePriceProductWarehouse = () => {
        dispatch(updateProductPriceAPI({ id: product.Product.id, price: calculatorDivide({num1:formPrice.price, num2: exchangeRateFavorite.rateToUSD, decimals:2})}));
    }

    return (
        <div className="w-[200px] h-[300px] m-[10px] transition-all duration-200 rounded overflow-hidden relative shadow-[0px_2px_5px_rgba(0,0,0,0.3)]
                    hover:w-[210px] hover:h-[310px] hover:m-[5px] hover:shadow-[0px_5px_10px_rgba(0,0,0,0.3)]">


            <div className="flex justify-center" >
                <img src={product.Product.image || logos.logoNoImage} alt={product.Product.name} className="h-[120px]" />
            </div>

            <div className="absolute right-1 top-1 rounded-full bg-warning text-[14px] px-2" >
                {product.quantity} <span>{product.Product.UnitMeasure.abbreviation.toLocaleUpperCase()}</span>
            </div>

            <div className="flex flex-col p-2">
                <p className="uppercase font-bold">{product.Product.name}</p>
                <p className="uppercase text-[12px] text-secondary leading-none">{product.Product.code}</p>
                <div className="h-[50px] overflow-y-scroll scroll-custom" >
                    <p className="text-[14px] mt-1" >{product.Product.description}</p>
                </div>
            </div>

            <div className="font-bold absolute bottom-[36px] left-2" >
                {editPrice ?
                    <div className="font-normal mb-1 flex items-center">
                        <input
                            className="border border-secondary rounded-s-md w-[80px] focus:outline-none text-[12px] px-1"
                            type="number"
                            name="price"
                            step="0.01"
                            onChange={handleInputChange}
                            value={formPrice.price}
                        />
                        <div className="border border-secondary bg-secondary text-white rounded-e-md text-[12px] px-1" >
                            {exchangeRateFavorite.Currency.symbol}
                        </div>

                        {loadingData ?
                            <span>
                                <AiOutlineLoading className="ms-2 animate-spin" />
                            </span>
                            :
                            <>
                                <button
                                    type="button"
                                    onClick={updatePriceProductWarehouse}
                                    className="bg-success ms-1 rounded-full h-[18px] w-[18px] text-[14px] text-white flex items-center justify-center" >
                                    <IoMdCheckmark />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setEditPrice(false) }}
                                    className="bg-danger ms-1 rounded-full h-[18px] w-[18px] text-[14px] text-white flex items-center justify-center" >
                                    <IoClose />
                                </button>
                            </>
                        }
                    </div>
                    :
                    <>
                        {(product.Product.price && (product.Product.price !== '')) ?
                            <div className="flex" >
                                {product.Product.price}
                                <span className="font-medium ms-1" > {exchangeRateFavorite.Currency.symbol} </span>
                                <button
                                    type="button"
                                    className="text-secondary/80 ms-2 text-[14px] hover:text-secondary"
                                    onClick={() => { setEditPrice(true); resetData()}}
                                ><FaEdit />
                                </button>
                            </div>
                            :
                            <button
                                type="button"
                                onClick={() => { setEditPrice(true) }}
                                className="font-normal text-[12px] bg-success/70 hover:bg-success text-white px-2 rounded-full"
                            >Agregar precio
                            </button>
                        }
                    </>
                }
            </div>
            <button
                disabled={(product.Product.price === '') || (product.Product.price === undefined)}
                type="button"
                className={` ${product.selected ? 'bg-primary text-white' : 'text-primary'} 
                        border-2 border-primary flex justify-center items-center absolute bottom-0 right-0 left-0 m-2 rounded-lg cursor-pointer
                        disabled:border-secondary disabled:bg-secondary disabled:text-white disabled:cursor-not-allowed`}
                onClick={() => { toggleProduct(product.Product.id) }}
            >
                {product.selected ? "EN CARRITO" : "AGREGAR"} <MdShoppingCart className="ms-2" />
            </button>
        </div>
    );
}