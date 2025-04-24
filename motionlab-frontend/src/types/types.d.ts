declare module "my-types" {
    export interface TeamData {
        team: string;
        totalPlays: number;
        avgTime: number;
        avgPlaceToday: number;
        avgPlaceHistoric: number;
    }
  
    export interface StudentData {
        student: string;
        team: string;
        totalPlays: number;
        avgTime: number;
        avgPlaceToday: number;
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