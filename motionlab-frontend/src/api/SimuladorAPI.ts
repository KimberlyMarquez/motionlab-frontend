import api from ".";

export const getCalcSimulacion = async (parameters: any) => {
  try {
    const res = await api.post("/sim", parameters);
    return res.data;
  } catch (error) {
    console.error("Error al obtener cálculos.", error);
    throw error;
  }
};

export const getStudentsByTeamId = async (teamId: number) => {
  try {
    const res = await api.get(`/st/${teamId}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener estudiantes del equipo.", error);
    throw error;
  }
};

export const getMatchParameters = async (matchId: number) => {
  try {
    const res = await api.get(`/match/${matchId}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener parámetros de la partida.", error);
    throw error;
  }
};

export const getRoundId = async (matchId: number) => {
  try {
    const res = await api.get(`/round/current/${matchId}`);
    console.log("ID DE RONDA", res.data);
    return res.data;
  } catch (error) {
    console.error("Error al obtener ronda.", error);
    throw error;
  }
};

export const sendStudentScores = async (roundId: number, results: any[]) => {
  try {
    const payload = {
      roundId: roundId,
      results: results,
    };

    const res = await api.post("/studentscores", payload);
    return res.data;
  } catch (error) {
    console.error("Error al enviar puntuaciones de estudiantes.", error);
    throw error;
  }
};

export const sendTeamScores = async (roundId: number, results: any) => {
  try {
    const payload = {
      results: results,
      roundId: roundId,
    };

    const res = await api.post("/teamscores", payload);
    return res.data;
  } catch (error) {
    console.error("Error al enviar puntuaciones de equipos.", error);
    throw error;
  }
};

export const getMatchStatus = async (round_id: number) => {
  const response = await api.get(`/match/status/${round_id}`);
  return response.data;
};

export const changeMatchStatus = async (match_id: number, newStatus: boolean) => {
  const response = await api.post("/match/status", { match_id, newStatus });
  return response.data;
};

export const getSimulationStatus = async (round_id: number) => {
  const response = await api.get(`/sim/${round_id}`);
  return response.data;
};
