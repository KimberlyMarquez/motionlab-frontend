import api from '.';

export const getCalcSimulacion = async (parameters: any) => {
    try {
        const res = await api.post("/sim", parameters);
        return res.data;
    } catch (error) {
        console.error("Error al obtener cálculos.", error);
        throw error;
    }
}