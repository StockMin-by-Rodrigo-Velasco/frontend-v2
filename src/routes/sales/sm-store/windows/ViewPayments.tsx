import { useDispatch, useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { dateLocal } from "../../../../helpers";
import { CreatePaymentDto, Currency, Payment } from "../../../../interfaces";
import { AppDispatch, RootState } from "../../../../redux/store";
import { InputNumber, InputSelect, InputText } from "../../../../components/Input";
import { useForm } from "../../../../hooks";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FormEvent, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { createPaymentAPI } from "../../../../redux/sales/salesThunk";
import { hideNotification, showNotificationError } from "../../../../redux/notification/notificationSlice";

interface ViewPaymentsProp {
    closeButton: () => void;
    addPayment: (payment: Payment, totalAmount:number) => void;
    totalAmount: string;
    payments: Payment[];
    currency: Currency;
    docName: string;
    docSaleId: string;
}


export default function ViewPayments({ closeButton, addPayment, totalAmount, payments, currency, docName, docSaleId }: ViewPaymentsProp) {
    const { loadingData } = useSelector((s: RootState) => s.Aplication);
    const { logo } = useSelector((s: RootState) => s.Branch);
    const { paymentMethods } = useSelector((s: RootState) => s.Sales);

    const dispatch = useDispatch<AppDispatch>();

    const [registerPayment, setRegisterPayment] = useState(false);

    const { data, handleInputChange } = useForm<CreatePaymentDto>({ docSaleId, paymentMethodId: '', amount: '', description: '' });

    const totalPayment = (): string => {
        return payments.reduce((acc, p) => { return acc + parseFloat(p.amount) }, 0).toFixed(2);
    }

    const createPayment = (e: FormEvent) => {
        e.preventDefault();
        const residue = parseFloat(totalAmount) - parseFloat(totalPayment());

        if (residue < parseFloat(data.amount)){ // Verifica que no se este pagando mas que el saldo
            dispatch(showNotificationError({tittle: 'REGISTRO DE PAGO', description: 'Los pagos superan el monto total de la venta. Verifica el monto cobrado y vuelve a intentar.'}))
            setTimeout(() => dispatch(hideNotification()), 5000);
            return;
        }
        setRegisterPayment(false)
        dispatch(createPaymentAPI(data, addPayment));
    }


    return (
        <Windows closeButton={closeButton} tittle={`Lista de pagos - ${docName}`}>
            <div className="p-3 w-[700px]">
                <div className="flex items-center mb-3">
                    <img src={logo} className="w-[300px]" />
                    <div>
                        <h1 className="bg-warning rounded px-3 font-bold" >IMPORTANTE</h1>
                        <p className="px-3 text-[12px] text-secondary">Los pagos de la <span className="font-semibold">{docName}</span> por un total de <span className="font-semibold">{totalAmount}</span> solo pueden registrarse en la misma moneda de cambio con la que se registro dicha venta, en este caso solo se pueden registrar pagos en <span className="font-semibold">{currency.name.toUpperCase()}</span>.</p>
                    </div>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="bg-secondary/70">
                            <th className="w-[200px]"><span className="translate-y-[-7px]">FECHA</span></th>
                            <th className="w-[200px]"><span className="translate-y-[-7px]">DESCRIPCION</span></th>
                            <th className="w-[100px]"><span className="translate-y-[-7px]">METODO</span></th>
                            <th className="w-[100px]"><span className="translate-y-[-7px]">MONTO</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 && <tr><td colSpan={4} className="text-center p-3 text-secondary" > No se registró ningún pago </td></tr>}
                        {payments.map((p, i) => (
                            <tr key={p.id} className={(i%2 === 0)? 'bg-secondary/20':''} >
                                <td className="text-center" > <span className="translate-y-[-7px]">{dateLocal(p.createdAt || '')}</span></td>
                                <td className="text-center" > <span className="translate-y-[-7px]">{p.description}</span></td>
                                <td className="text-center" > <span className="translate-y-[-7px]">{p.PaymentMethod.name}</span></td>
                                <td className="text-end"> <span className="translate-y-[-7px]">{p.amount} {currency.symbol}</span></td>
                            </tr>
                        ))}
                        <tr className="font-semibold bg-success/50" >
                            <td colSpan={3} className="text-center"> <span className="translate-y-[-7px]">MONTO PAGADO</span></td>
                            <td className="text-end" >{totalPayment()} {currency.symbol} </td>
                        </tr>
                        <tr className="font-semibold bg-primary/50" >
                            <td colSpan={3} className="text-center"> <span className="translate-y-[-7px]">SALDO</span></td>
                            <td className="text-end" >{ (parseFloat(totalAmount) - parseFloat(totalPayment())).toFixed(2) }</td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="px-3 pb-3 w-[700px]">
                <form className="flex items-end w-full relative" onSubmit={createPayment}>
                    {!registerPayment &&
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-white z-20 flex justify-center items-center">
                            <button
                                disabled={loadingData}
                                onClick={() => setRegisterPayment(true)}
                                type="button"
                                className="border-2 border-secondary text-secondary border-dashed w-full h-full px-4 rounded-full hover:bg-secondary/10 disabled:cursor-not-allowed flex justify-center items-center">
                                {loadingData ? 
                                    <span className="flex"><AiOutlineLoading className="me-2 animate-spin"/>Registrando pago</span>
                                    :
                                    <span>Registrar nuevo pago</span>}
                            </button>
                        </div>
                    }

                    <InputNumber
                        name="amount"
                        handleInputChange={handleInputChange}
                        value={data.amount}
                        placeholder={`Cantidad (${currency.symbol})`}
                        className="me-2 w-[20%]"
                        required
                    />
                    <InputText
                        name="description"
                        handleInputChange={handleInputChange}
                        value={data.description || ''}
                        placeholder={`Descripción`}
                        className="me-2 w-[45%]"
                    />
                    <InputSelect
                        handleInputChange={handleInputChange}
                        name="paymentMethodId"
                        optionDefault="Sin metodo"
                        options={paymentMethods.map(pm => ({ value: pm.id, name: pm.name }))}
                        placeholder="Metodo de pago"
                        value={data.paymentMethodId}
                        className="w-[20%]"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-success/80 text-white flex justify-center items-center w-7 h-7 rounded-full hover:bg-success ms-auto"
                    >
                        <FaCheck />
                    </button>
                    <button
                        onClick={() => setRegisterPayment(false)}
                        type="button"
                        className="bg-danger/80 text-white flex justify-center items-center w-7 h-7 rounded-full hover:bg-danger ms-2 text-[24px]"
                    >
                        <IoClose />
                    </button>
                </form>
            </div>
        </Windows>
    );
}