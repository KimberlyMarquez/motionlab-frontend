import api from "./index";
import { TeamData, StudentData } from "my-types";

export const getTeamData = async (): Promise<TeamData[]> => {
  try {
    const response = await api.get<{
      payload: TeamData[];
      message: string;
      status: string;
    }>("/teamstats"); // Ajustar ruta
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching team data:", error);
    throw error;
  }
};

export const getStudentData = async (): Promise<StudentData[]> => {
  try {
    const response = await api.get<{
      payload: StudentData[];
      message: string;
      status: string;
    }>("/student"); // Ajustar ruta
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};
