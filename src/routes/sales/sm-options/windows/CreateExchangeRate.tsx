import { useDispatch, useSelector } from "react-redux";
import { InputNumberForm, InputSelect } from "../../../../components/Input";
import Windows from "../../../../components/Windows";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "../../../../hooks";
import { CreateExchangeRateDto, Currency } from "../../../../interfaces";
import { createExchangeRateAPI } from "../../../../redux/sales/salesThunk";
import { ButtonSubmit } from "../../../../components/Buttons";

interface CreateExchangeRateProp {
    closeButton: () => void;
}


export default function CreateExchangeRate({ closeButton }: CreateExchangeRateProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { id: branchId } = useSelector((s: RootState) => s.Branch);
    const { currencies } = useSelector((s: RootState) => s.Sales);

    const dispatch = useDispatch<AppDispatch>();
    const [listCurrencies, setListCurrencies] = useState<Currency[]>([]);

    const { data, handleInputChange } = useForm<{ currencyId: string, rateToUSD: string }>({ currencyId: '', rateToUSD: '0' });

    const createExchangeRate = (e: FormEvent) => {
        e.preventDefault();
        const createExchangeRateDto: CreateExchangeRateDto = {
            branchId,
            currencyId: data.currencyId,
            rateToUSD: data.rateToUSD
        }
        dispatch(createExchangeRateAPI(createExchangeRateDto));
    }
    useEffect(() => {
      setListCurrencies(currencies.filter(c => c.code!=='usd'))
    }, [])
    
    return (
        <Windows tittle="Creación de cambio de moneda" closeButton={closeButton} >
            <form onSubmit={createExchangeRate} className="p-2 flex flex-col justify-center items-center" >
                <div className="px-2 flex flex-col justify-center mb-3">
                    <InputSelect
                        handleInputChange={handleInputChange}
                        name="currencyId"
                        options={listCurrencies.map(c => ({ name: `${c.code}-${c.name}`, value: c.id }))}
                        optionDefault="Sin seleccion"
                        placeholder="Tipo de moneda"
                        value={data.currencyId}
                        required
                    />
                </div>
                <div className="flex items-center mb-3" >
                    <h1 className="font-bold text-[18px] me-2" >1 USD = </h1>
                    <InputNumberForm
                        className="w-36"
                        name="rateToUSD"
                        handleInputChange={handleInputChange}
                        value={data.rateToUSD}
                        step="0.01"
                        disabled={data.currencyId === ''}
                    />

                    <h1 className="uppercase" >{currencies.find(c => c.id === data.currencyId)?.code}</h1>
                </div>

                <div className="flex">
                    <ButtonSubmit
                        disabled={data.currencyId === ''}
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