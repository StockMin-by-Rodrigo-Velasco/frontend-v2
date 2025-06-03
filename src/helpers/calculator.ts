interface CalculatorArg{
    num1:string,
    num2:string,
    decimals?: number
}

export const calculatorMultiply = ({num1, num2, decimals=2}:CalculatorArg):string => {
    const num1Float:number = isNaN(parseFloat(num1))?0:parseFloat(num1);
    const num2Float:number = isNaN(parseFloat(num2))?0:parseFloat(num2);

    return (num1Float*num2Float).toFixed(decimals)
}

export const calculatorDivide = ({num1, num2, decimals=2}:CalculatorArg):string => {
    const num1Float:number = isNaN(parseFloat(num1))?0:parseFloat(num1);
    const num2Float:number = isNaN(parseFloat(num2))?0:parseFloat(num2);

    return (num1Float/num2Float).toFixed(decimals)
}