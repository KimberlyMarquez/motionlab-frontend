declare module "my-types" {
  export interface StudentData {
    id: string;
    played_rounds: number;
    average_time: number;
    average_match_position: number;
    average_historic_position: number;
  }
  
  export interface TeamData {
    id: number;
    team_id: number;
    played_rounds: number;
    average_time: number;
    average_position: number;
  }

  export interface TeamInfo {
    name: string;
    time: number;
    position: number;
  }

  export interface StudentInfo {
    name: string;
    time: number;
    position: number;
  }
}
