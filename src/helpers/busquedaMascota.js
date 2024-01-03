import listaMascotas from "./listaMascotas.json";

export const busquedaMascota = (value) => {
    const lowerValue = value.toLowerCase();
    const response = [];

    listaMascotas.forEach((item) => {
        const lowerRaza = item.raza.toLowerCase();
        if (lowerRaza.includes(lowerValue)) {
            response.push(item);
        }
    });

    return value === "" ? response : response.slice(0, 24);
};
