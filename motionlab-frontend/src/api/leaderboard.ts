import api from "./index";
import { TeamInfo, StudentInfo } from "my-types";

export const getTeamInfo = async (): Promise<TeamInfo[]> => {
  try {
    const response = await api.get<{
      payload: TeamInfo[];
      message: string;
      status: string;
    }>("/teamscores");
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching info:", error);
    throw error;
  }
};

export const getStudentInfo = async (): Promise<StudentInfo[]> => {
  try {
    const response = await api.get<{
      payload: StudentInfo[];
      message: string;
      status: string;
    }>("/studentscores");
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
