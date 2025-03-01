

export const dateLocalWhitTime = (milisecons: number):String => {
    const date = new Date(milisecons).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false});
    return date;
}

export const dateLocal = (milisecons: number):String => {
    const date = new Date(milisecons).toLocaleDateString("es-ES", {day:'2-digit', month:'long', year:'numeric'});
    return date;
}