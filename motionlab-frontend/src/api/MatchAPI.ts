import api from ".";

export interface Match {
  id: number;
  teacher_id: string;
  teams: number;
  members: number;
  rounds_amount: number;
  rpm: number;
  wheel_size: number;
  distance: number;
  code: string;
  active: boolean;
  start_time: string;
  end_time: string | null;
}

export interface CreateMatchPayload {
  teacher_id: string;
  teams: number;
  rounds_amount: number;
  members: number;
  rpm: number;
  wheel_size: number;
  distance: number;
}

// Crear una nueva partida
export const createMatch = async (payload: CreateMatchPayload) => {
  const response = await api.post("/match", payload);
  return response.data;
};

export const changeMatchStatus = async (
  match_id: number,
  newStatus: boolean
) => {
  const response = await api.post("/match/status", { match_id, newStatus });
  return response.data;
};

export const getMatchStatus = async (match_id: number) => {
  const response = await api.get(`/match/status/${match_id}`);
  return response.data;
};
