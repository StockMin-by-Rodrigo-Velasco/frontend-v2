import { IconType } from "react-icons";
import { BiCreditCardAlt } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { CiBank } from "react-icons/ci";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { MdOutlineAccountBalanceWallet, MdQrCodeScanner } from "react-icons/md";


// export const paymentMethodIcon:Record<
// 'cash'|'card'|'bank_transfer'|'qr_payment'|'check'|'mobile_wallet', 
// IconType> = {
//     'cash':BsCashCoin,
//     'card':BiCreditCardAlt,
//     'bank_transfer':CiBank,
//     'qr_payment':MdQrCodeScanner,
//     'check':LiaMoneyCheckAltSolid,
//     'mobile_wallet':MdOutlineAccountBalanceWallet,
// }

export const paymentMethodIcon = (code: string):IconType=>{
    switch (code) {
        case 'cash':
            return BsCashCoin;
        case 'card':
            return BiCreditCardAlt;
        case 'bank_transfer':
            return CiBank;
        case 'qr_payment':
            return MdQrCodeScanner;
        case 'check':
            return LiaMoneyCheckAltSolid;
        case 'mobile_wallet':
            return MdOutlineAccountBalanceWallet;
        default:
            return BsCashCoin;
    }

}
