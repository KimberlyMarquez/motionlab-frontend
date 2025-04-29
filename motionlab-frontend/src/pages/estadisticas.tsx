import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeamData } from "my-types";
import { StudentData } from "my-types";
import "./estadisticas.css";
import Leaderboard from "../components/Leaderboard";
import descargaIcon from "/descarga.png";
import coronaIcon from "/corona.png";

// Datos de equipos
const teamData: TeamData[] = [
  {
    team: "Equipo 1",
    totalPlays: 12,
    avgTime: 1.3,
    avgPlaceToday: 2,
    avgPlaceHistoric: 3,
  },
  {
    team: "Equipo 2",
    totalPlays: 10,
    avgTime: 1.8,
    avgPlaceToday: 1,
    avgPlaceHistoric: 4,
  },
  {
    team: "Equipo 3",
    totalPlays: 11,
    avgTime: 1.2,
    avgPlaceToday: 4,
    avgPlaceHistoric: 2,
  },
  {
    team: "Equipo 4",
    totalPlays: 13,
    avgTime: 1.8,
    avgPlaceToday: 3,
    avgPlaceHistoric: 1,
  },
  {
    team: "Equipo 5",
    totalPlays: 11,
    avgTime: 1.5,
    avgPlaceToday: 6,
    avgPlaceHistoric: 5,
  },
  {
    team: "Equipo 6",
    totalPlays: 11,
    avgTime: 1.3,
    avgPlaceToday: 6,
    avgPlaceHistoric: 6,
  },
];

// Datos de alumnos
const studentData: StudentData[] = [
  {
    student: "AXXXX",
    team: "1",
    totalPlays: 4,
    avgTime: 1.8,
    avgPlaceToday: 2,
    avgPlaceHistoric: 2,
  },
  {
    student: "AXXXX",
    team: "4",
    totalPlays: 1,
    avgTime: 1.9,
    avgPlaceToday: 3,
    avgPlaceHistoric: 1,
  },
  {
    student: "AXXXX",
    team: "2",
    totalPlays: 4,
    avgTime: 1.2,
    avgPlaceToday: 1,
    avgPlaceHistoric: 3,
  },
  {
    student: "AXXXX",
    team: "2",
    totalPlays: 4,
    avgTime: 1.5,
    avgPlaceToday: 2,
    avgPlaceHistoric: 2,
  },
  {
    student: "AXXXX",
    team: "3",
    totalPlays: 4,
    avgTime: 0.9,
    avgPlaceToday: 4,
    avgPlaceHistoric: 1,
  },
  {
    student: "AXXXX",
    team: "2",
    totalPlays: 4,
    avgTime: 1.5,
    avgPlaceToday: 2,
    avgPlaceHistoric: 2,
  },
  {
    student: "AXXXX",
    team: "3",
    totalPlays: 4,
    avgTime: 0.9,
    avgPlaceToday: 4,
    avgPlaceHistoric: 1,
  },
  {
    student: "AXXXX",
    team: "2",
    totalPlays: 4,
    avgTime: 1.5,
    avgPlaceToday: 2,
    avgPlaceHistoric: 2,
  },
  {
    student: "AXXXX",
    team: "3",
    totalPlays: 4,
    avgTime: 0.9,
    avgPlaceToday: 4,
    avgPlaceHistoric: 1,
  },
  {
    student: "AXXXX",
    team: "2",
    totalPlays: 4,
    avgTime: 1.5,
    avgPlaceToday: 2,
    avgPlaceHistoric: 2,
  },
  {
    student: "AXXXX",
    team: "3",
    totalPlays: 4,
    avgTime: 0.9,
    avgPlaceToday: 4,
    avgPlaceHistoric: 1,
  },
  {
    student: "AXXXX",
    team: "2",
    totalPlays: 4,
    avgTime: 1.5,
    avgPlaceToday: 2,
    avgPlaceHistoric: 2,
  },
  {
    student: "AXXXX",
    team: "3",
    totalPlays: 4,
    avgTime: 0.9,
    avgPlaceToday: 4,
    avgPlaceHistoric: 1,
  },
  {
    student: "AXXXX",
    team: "2",
    totalPlays: 4,
    avgTime: 1.5,
    avgPlaceToday: 2,
    avgPlaceHistoric: 2,
  },
  {
    student: "AXXXX",
    team: "3",
    totalPlays: 4,
    avgTime: 0.9,
    avgPlaceToday: 4,
    avgPlaceHistoric: 1,
  },
];

const Statistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"equipos" | "alumnos">("equipos");
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <div className="background-container1">
      <div className="container">
        <div className="header-container">
          <div className="actions-container">
            <button className="btn-return" onClick={() => navigate(-1)}>
              &lt; Regresar
            </button>
            <div className="icon-buttons">
              <button className="icon-btn">
                <img src={descargaIcon} alt="Descargar" className="icon-img" />
              </button>
              <button className="icon-btn" onClick={toggleLeaderboard}>
                <img src={coronaIcon} alt="Leaderboard" className="icon-img" />
              </button>
            </div>
          </div>
          <div className="header">ESTADÍSTICAS</div>
        </div>

        <div className="tabs-container">
          <button
            className={`tab-btn ${
              activeTab === "equipos" ? "tab-equipos" : ""
            }`}
            onClick={() => setActiveTab("equipos")}
          >
            Equipos
          </button>
          <button
            className={`tab-btn ${
              activeTab === "alumnos" ? "tab-alumnos" : ""
            }`}
            onClick={() => setActiveTab("alumnos")}
          >
            Alumnos
          </button>
        </div>

        <div className="table-container">
          {activeTab === "equipos" ? (
            <TeamsTable data={teamData} />
          ) : (
            <div className="table-container-scrollable">
              <StudentsTable data={studentData} />
            </div>
          )}
        </div>

        {showLeaderboard && <Leaderboard onClose={toggleLeaderboard} />}
      </div>
    </div>
  );
};

// Tabla de Equipos
const TeamsTable: React.FC<{ data: TeamData[] }> = ({ data }) => (
  <table className="stats-table">
    <thead>
      <tr>
        <th>Equipo</th>
        <th>Jugadas Totales</th>
        <th>Tiempo Promedio (min)</th>
        <th>Lugar Promedio Hoy</th>
        <th>Lugar Promedio Histórico</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          <td>{row.team}</td>
          <td>{row.totalPlays}</td>
          <td>{row.avgTime}</td>
          <td>{row.avgPlaceToday}</td>
          <td>{row.avgPlaceHistoric}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Tabla de Alumnos
const StudentsTable: React.FC<{ data: StudentData[] }> = ({ data }) => (
  <table className="stats-table table-alumnos">
    <thead>
      <tr>
        <th>Alumno</th>
        <th>Equipo</th>
        <th>Jugadas Totales</th>
        <th>Tiempo Promedio</th>
        <th>Lugar Promedio Hoy</th>
        <th>Lugar Promedio Histórico</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          <td>{row.student}</td>
          <td>{row.team}</td>
          <td>{row.totalPlays}</td>
          <td>{row.avgTime}</td>
          <td>{row.avgPlaceToday}</td>
          <td>{row.avgPlaceHistoric}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Statistics;
