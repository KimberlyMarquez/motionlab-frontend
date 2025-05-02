import api from ".";

export const accederConCodigo = async (codigo: string) => {
  try {
    const response = await api.get(`/lobby/access/${codigo}`);
    const matchId = response.data.payload.id;
    const integrantes = response.data.payload.members
    console.log(matchId);

    if (!matchId) throw new Error("No se pudo obtener el ID de la partida.");

    sessionStorage.setItem("matchId", matchId);
    sessionStorage.setItem("codigo", codigo);
    sessionStorage.setItem("members", integrantes);
    console.log(integrantes);

    const createTeamRes = await api.post("/team", {
      match_id: matchId,
    });

    const teamId = createTeamRes.data.payload?.team_id;
    if (!teamId) throw new Error("No se pudo crear el equipo.");

    sessionStorage.setItem("teamId", teamId);

    return { matchId, teamId, success: true, };
  } catch (error: any) {
    console.error("Error en accederConCodigo:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Error inesperado",
    };
  }
};

