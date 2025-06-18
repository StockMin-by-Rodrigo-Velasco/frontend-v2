import { useSelector } from "react-redux";
import Windows from "../../../../components/Windows";
import { ProductCart } from "../../../../interfaces/formInterface";
import { RootState } from "../../../../redux/store";

interface PurchaseSummaryProp {
    closeButton: () => void;
    productsCart: ProductCart[]
}

export default function PurchaseSummary({ closeButton, productsCart }: PurchaseSummaryProp) {
    const { exchangeRateFavorite } = useSelector((s: RootState) => s.Sales);

    const totalAmount = (): string => {
        return productsCart.reduce((acc, p) => { return acc + (p.quantityCart * parseFloat(p.priceCart)) }, 0).toFixed(2)
    }
    return (
        <Windows closeButton={closeButton} tittle="RESUMEN DE COMPRA" >
            <div className="flex flex-col max-h-[50vh] overflow-y-scroll scroll-custom ps-2 py-2">
                <table className="table-fixed w-full text-left border-secondary rounded overflow-hidden" >
                    <thead className="bg-secondary/50">
                        <tr>
                            <th className="w-28 text-center">NOMBRE</th>
                            <th className="w-9 text-center">CANT.</th>
                            <th className="w-12 text-center">P/UNIT.</th>
                            <th className="w-12 text-center">SUBTOTAL</th>
                        </tr>
                    </thead>
                    <tbody >
                        {productsCart.map((p, i) => (
                            <tr key={i} className="border-b border-secondary" >
                                <td className="px-2" >{p.Product.name.toUpperCase()}</td>
                                <td className="px-2 text-center" >{p.quantityCart} {p.Product.UnitMeasure.abbreviation.toUpperCase()}</td>
                                <td className="px-2 text-end" >{p.priceCart} {exchangeRateFavorite.Currency.symbol}</td>
                                <td className="px-2 text-end" >{(parseFloat(p.priceCart) * p.quantityCart).toFixed(2)} {exchangeRateFavorite.Currency.symbol}</td>
                            </tr>
                        ))}
                        <tr className="bg-secondary/50 font-semibold" >
                            <td colSpan={2} className="text-start ps-2">TOTAL</td>
                            <td colSpan={2} className="text-end pe-2">{totalAmount()} {exchangeRateFavorite.Currency.symbol}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </Windows>
    );
}