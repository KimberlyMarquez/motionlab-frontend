declare module "my-types" {
  export interface TeamData {
    team: number;
    totalPlays: number;
    avgTime: number;
    avgPlaceHistoric: number;
  }

  export interface StudentData {
    student_id: string;
    round_id: number;
    score: number;
    time: number;
    avgPlaceHistoric: number;
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
