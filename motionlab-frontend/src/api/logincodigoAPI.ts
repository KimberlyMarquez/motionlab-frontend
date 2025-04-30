import api from ".";

export const accederConCodigo = async (codigo: string) => {
  try {
    // Validar el código y obtener el ID del match
    const response = await api.get(`/lobby/access/${codigo}`);
    const matchId = response.data.payload.id;
    console.log(matchId);

    if (!matchId) throw new Error("No se pudo obtener el ID de la partida.");

    // Guardar en sessionStorage
    sessionStorage.setItem("matchId", matchId);
    sessionStorage.setItem("codigo", codigo);

    // Crear un nuevo equipo en la partida
    const createTeamRes = await api.post("/team", {
      match_id: matchId,
    });

    const teamId = createTeamRes.data.payload?.team_id;
    if (!teamId) throw new Error("No se pudo crear el equipo.");

    // Guardar también el teamId para usarlo después
    sessionStorage.setItem("teamId", teamId);

    return { matchId, teamId,success: true,};
  } catch (error: any) {
    console.error("Error en accederConCodigo:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Error inesperado",
    };
  }
};

