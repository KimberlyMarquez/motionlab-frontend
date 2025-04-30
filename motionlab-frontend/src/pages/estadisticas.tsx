import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TeamData, StudentData } from "my-types";
import "./estadisticas.css";
import Leaderboard from "../components/Leaderboard";
import descargaIcon from "/descarga.png";
import coronaIcon from "/corona.png";
import { getTeamData, getStudentData } from "../api/estadistica";

const Statistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"equipos" | "alumnos">("equipos");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [teams, setTeams] = useState<Omit<TeamData, "id">[]>([]);
  const [students, setStudents] = useState<StudentData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsResponse, studentsResponse] = await Promise.all([
          getTeamData(),
          getStudentData(),
        ]);
        setTeams(teamsResponse);
        setStudents(studentsResponse);
      } catch (error) {
        console.error("Error loading statistics data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const downloadCSV = () => {
    let csvContent = "";

    if (activeTab === "equipos") {
      csvContent += "Equipo,Rondas Jugadas,Tiempo Promedio,Lugar Promedio Historico\n";
      teams.forEach((row) => {
        csvContent += `${row.team_id},${row.played_rounds},${row.average_time},${row.average_position}\n`;
      });
    } else {
      csvContent += "Alumno,Rondas Jugadas,Tiempo Promedio,Lugar Promedio Match,Lugar Promedio Historico\n";
      students.forEach((row) => {
        csvContent += `${row.id},${row.played_rounds},${row.average_time},${row.average_match_position},${row.average_historic_position}\n`;
      });
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${activeTab}_estadisticas.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <button className="icon-btn" onClick={downloadCSV}>
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
            className={`tab-btn ${activeTab === "equipos" ? "tab-equipos" : ""}`}
            onClick={() => setActiveTab("equipos")}
          >
            Equipos
          </button>
          <button
            className={`tab-btn ${activeTab === "alumnos" ? "tab-alumnos" : ""}`}
            onClick={() => setActiveTab("alumnos")}
          >
            Alumnos
          </button>
        </div>

        <div className="table-container">
          {activeTab === "equipos" ? (
            <TeamsTable data={teams} />
          ) : (
            <div className="table-container-scrollable">
              <StudentsTable data={students} />
            </div>
          )}
        </div>

        {showLeaderboard && <Leaderboard onClose={toggleLeaderboard} />}
      </div>
    </div>
  );
};

const TeamsTable: React.FC<{ data: Omit<TeamData, "id">[] }> = ({ data }) => (
  <table className="stats-table">
    <thead>
      <tr>
        <th>Equipo</th>
        <th>Rondas Totales</th>
        <th>Tiempo Promedio</th>
        <th>Lugar Promedio Histórico</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          <td>{row.team_id}</td>
          <td>{row.played_rounds}</td>
          <td>{row.average_time}</td>
          <td>{row.average_position}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const StudentsTable: React.FC<{ data: StudentData[] }> = ({ data }) => (
  <table className="stats-table table-alumnos">
    <thead>
      <tr>
        <th>Alumno</th>
        <th>Rondas Totales</th>
        <th>Tiempo Promedio</th>
        <th>Lugar Promedio Match</th>
        <th>Lugar Promedio Histórico</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          <td>{row.id}</td>
          <td>{row.played_rounds}</td>
          <td>{row.average_time}</td>
          <td>{row.average_match_position}</td>
          <td>{row.average_historic_position}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Statistics;

