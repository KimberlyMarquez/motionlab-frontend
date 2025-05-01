import api from ".";

export const createRound = async (match_id: number) => {
  try {
    const res = await api.post("/round", { match_id });
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
