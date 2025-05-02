import api from ".";

export const registrarAlumnos = async (teamId: string, matriculas: string[]) => {
  try {
    console.log(matriculas);
    console.log(teamId);
    const response = await api.post("/student", {
      ids: matriculas,
      team_id: teamId,
    }
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: any) {
    console.error("Error al registrar alumnos:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Error desconocido al registrar alumnos",
    };
  }
};
