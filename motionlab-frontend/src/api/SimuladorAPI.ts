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


export const getRoundId = async (matchId: number) => {
    try {
        const res = await api.get(`/round/current/${matchId}`);
        console.log("ID DE RONDA", res.data);
        return res.data;
    } catch (error) {
        console.error("Error al obtener ronda.", error);
        throw error;
    }
}


export const sendStudentScores = async (roundId: number, results: any[]) => {
    try {
        const payload = {
            roundId: roundId, 
            results: results
        };
        
        const res = await api.post('/studentscores', payload);
        return res.data;
    } catch (error) {
        console.error("Error al enviar puntuaciones de estudiantes.", error);
        throw error;
    }
}