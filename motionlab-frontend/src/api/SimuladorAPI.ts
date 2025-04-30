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

export const getStudentsByTeamId = async (teamId: number) => {
    try {
        const res = await api.get(`/st/${teamId}`);
        return res.data;
    } catch (error) {
        console.error("Error al obtener estudiantes del equipo.", error);
        throw error;
    }
}

export const getMatchParameters = async (matchId: number) => {
    try {
        const res = await api.get(`/match/${matchId}`);
        return res.data;
    } catch (error) {
        console.error("Error al obtener parámetros de la partida.", error);
        throw error;
    }
}