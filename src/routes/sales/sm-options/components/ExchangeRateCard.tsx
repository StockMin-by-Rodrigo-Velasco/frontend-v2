import { ExchangeRate } from "../../../../interfaces";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { toggleFavoriteExchangeRateAPI } from "../../../../redux/sales/salesThunk";

interface ExchangeRateProp {
    exchangeRate: ExchangeRate,
    openExchangeRate: (er: ExchangeRate) => void
}
export default function ExchangeRateCard({ exchangeRate, openExchangeRate: onClick }: ExchangeRateProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const dispatch = useDispatch<AppDispatch>();

    const toggleFavoriteExchangeRate = () => {
        dispatch(toggleFavoriteExchangeRateAPI(exchangeRate.id));
    }

    return (
        <div className="bg-secondary rounded overflow-hidden text-white relative me-2">

            {exchangeRate.favorite?
                <button
                    onClick={toggleFavoriteExchangeRate}
                    className={`${loadingData && 'cursor-wait'} absolute top-7 left-1 text-[14px] text-warning flex justify-center items-center`} >
                    <FaStar />
                </button>
                :
                <button
                    onClick={toggleFavoriteExchangeRate}
                    className={`${loadingData && 'cursor-wait'} absolute top-7 left-1 text-[14px] text-white flex justify-center items-center`} >
                    <FaRegStar />
                </button>
            }
            <button
                className="opacity-80 bg-info uppercase flex justify-center items-center w-full hover:opacity-100"
                onClick={() => { onClick(exchangeRate) }}
            >
                <span className="mx-3" >{exchangeRate.Currency.name}</span>
            </button>

            <div className="flex flex-col justify-center items-center uppercase m-2" >
                <span>1 USD</span>
                <span> = </span>
                <span>{exchangeRate.rateToUSD} {exchangeRate.Currency.code}</span>
            </div>
        </div>
    );
}