

export const dateLocalWhitTime = (miliseconds: number | string):String => {
    if (typeof miliseconds === 'string') {
        const bigMiliseconds = BigInt(miliseconds);
        return new Date(Number(bigMiliseconds)).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false});
    }
    return new Date(miliseconds).toLocaleDateString("es-ES", {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute: '2-digit', second:'2-digit', hour12: false});
}

export const dateLocal = (miliseconds: number | string):String => {
    if (typeof miliseconds === 'string') {
        const bigMiliseconds = BigInt(miliseconds);
        return new Date(Number(bigMiliseconds)).toLocaleDateString("es-ES", {day:'2-digit', month:'long', year:'numeric'});
    }
    return new Date(miliseconds).toLocaleDateString("es-ES", {day:'2-digit', month:'long', year:'numeric'});
}