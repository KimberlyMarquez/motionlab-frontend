import api from "."; 

export const getLobbyTeams = async (matchId: string) => {
    try {
      const res = await api.get(`/lobby/teams/${matchId}`);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      } else {
        return {
          message: "Error de conexión",
          status: "error",
        };
      }
    }
  };  

export const lobbyAccess = async (code: string) => {
  try {
    const res = await api.get(`/lobby/access/${code}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        message: "Error de conexión",
        status: "error",
      };
    }
  }
};

export const deleteTeamFromLobby = async (id: string) => {
  try {
    const res = await api.delete(`/lobby/teams/${id}`);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        message: "Error de conexión",
        status: "error",
      };
    }
  }
};
