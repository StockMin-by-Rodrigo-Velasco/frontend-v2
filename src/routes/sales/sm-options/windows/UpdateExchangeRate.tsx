import { useDispatch, useSelector } from "react-redux";
import { InputNumberForm } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent } from "react";
import { useForm } from "../../../../hooks";
import { ButtonSubmit } from "../../../../components/Buttons";
import { ExchangeRate, UpdateExchangeRateDto } from '../../../../interfaces/salesInterfaces';
import { updateExchangeRateAPI } from "../../../../redux/sales/salesThunk";

interface UpdateExchangeRateProp {
    closeButton: () => void;
    exchangeRate: ExchangeRate;
}


export default function UpdateExchangeRate({exchangeRate, closeButton }: UpdateExchangeRateProp) {
    const {loadingData} = useSelector((s:RootState) => s.Aplication);
    const dispatch = useDispatch<AppDispatch>();

    const { data, handleInputChange } = useForm<{ rateToUSD: string }>({rateToUSD: exchangeRate.rateToUSD });

    const createExchangeRate = (e: FormEvent) => {
        e.preventDefault();
        const updateExchangeRateDto: UpdateExchangeRateDto = {
            id: exchangeRate.id,
            rateToUSD: data.rateToUSD
        }
        dispatch(updateExchangeRateAPI(updateExchangeRateDto));
    }
    return (
        <Windows tittle="Modificación tipo de cambio" closeButton={closeButton} >
            <form onSubmit={createExchangeRate} className="p-2 flex flex-col justify-center items-center" >
                <div className="flex items-center mb-3" >
                    <h1 className="font-bold text-[18px] me-2" >1 USD = </h1>
                    <InputNumberForm
                        className="w-36"
                        name="rateToUSD"
                        handleInputChange={handleInputChange}
                        value={data.rateToUSD}
                        step="0.01"
                    />

                    <h1 className="uppercase" >{exchangeRate.Currency.code}</h1>
                </div>

                <div className="flex">
                    <ButtonSubmit
                        color="success"
                        label="Guardar"
                        className="mx-auto me-2"
                        loading={loadingData}
                    />
                </div>
            </form>
        </Windows>
    );
}