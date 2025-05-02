import api from "./index";
import { TeamData, StudentData } from "my-types";

export const getTeamData = async (): Promise<Omit<TeamData, "id">[]> => {
  try {
    const response = await api.get<{
      payload: TeamData[];
      message: string;
      status: string;
    }>("/teamstats");

    console.log("Teams data without id:", response.data.payload.map(({ id, ...rest }: TeamData) => rest));

    return response.data.payload.map(({ id, ...rest }: TeamData) => rest);

  } catch (error) {
    console.error("Error al obtener datos de equipos:", error);
    throw error;
  }
};


export const getStudentData = async (): Promise<StudentData[]> => {
  try {
    const response = await api.get<{
      payload: StudentData[];
      message: string;
      status: string;
    }>("/student");
    console.log("Datos de estudiantes obtenidos correctamente:", response.data.payload);
    return response.data.payload;
  } catch (error) {
    console.error("Error al obtener datos de estudiantes:", error);
    throw error;
  }
};
