import React, { useState, useEffect } from "react";
import { TeamInfo } from "my-types";
import { StudentInfo } from "my-types";
import "./Leaderboard.css";
import { FaCrown } from "react-icons/fa";
import { getTeamInfo, getStudentInfo } from "../api/leaderboard"; // Ajustar ruta de importación

// Función para obtener datos de equipos
const fetchTeamInfo = async (): Promise<TeamInfo[]> => {
  try {
    const response = await getTeamInfo();
    return response;
  } catch (error) {
    console.error("Error fetching team info:", error);
    return [];
  }
};

// Función para obtener datos de alumnos
const fetchStudentInfo = async (): Promise<StudentInfo[]> => {
  try {
    const response = await getStudentInfo();
    return response;
  } catch (error) {
    console.error("Error fetching student info:", error);
    return [];
  }
};

interface LeaderboardProps {
  onClose?: () => void;
}

// 🔧 Función para asignar clase según posición
const getTimeContainerClass = (position: number): string => {
  switch (position) {
    case 1:
      return "time-container first-place";
    case 2:
      return "time-container second-place";
    case 3:
      return "time-container third-place";
    default:
      return "time-container";
  }
};

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<"equipos" | "alumnos">("equipos");
  const [teamInfo, setTeamInfo] = useState<TeamInfo[]>([]);
  const [studentInfo, setStudentInfo] = useState<StudentInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const teams = await fetchTeamInfo();
      const students = await fetchStudentInfo();
      setTeamInfo(teams);
      setStudentInfo(students);
    };
    fetchData();
  }, []);

  const dataToDisplay = activeTab === "equipos" ? teamInfo : studentInfo;
  console.log(dataToDisplay);

  return (
    <div className="leaderboard-overlay">
      <div className="popup">
        <div className="popup-header-container">
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              <b>X</b>
            </button>
          )}
          <div className="popup-header">
            <span></span>
            <FaCrown className="icon-crown" />
            <h2>LEADERBOARD</h2>
            <FaCrown className="icon-crown" />
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab tab-left ${
              activeTab === "equipos" ? "active" : ""
            }`}
            onClick={() => setActiveTab("equipos")}
          >
            Equipos
          </button>
          <button
            className={`tab tab-right ${
              activeTab === "alumnos" ? "active" : ""
            }`}
            onClick={() => setActiveTab("alumnos")}
          >
            Alumnos
          </button>
        </div>

        <div
          className={`ranking-list ${
            activeTab === "equipos" ? "ranking-equipos" : "ranking-alumnos"
          }`}
        >
          <div className="subtitulo">Online HighScore</div>

          {dataToDisplay.map((item, index) => (
            <div
              key={index}
              className={`ranking-item ${
                index === 0
                  ? "first"
                  : index === 1
                  ? "second"
                  : index === 2
                  ? "third"
                  : ""
              }`}
            >
              <span className="position">{index + 1}</span>

              <div className={getTimeContainerClass(index + 1)}>
                <span className="time">{item.score.toFixed(0)}</span>
              </div>
              <span className="name">
                {dataToDisplay === teamInfo ? `Equipo ${item.id}` : item.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
