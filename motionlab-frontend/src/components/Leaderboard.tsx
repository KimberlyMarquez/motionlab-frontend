import React, { useState } from "react";
import "./Leaderboard.css";
import { FaCrown } from "react-icons/fa";

interface TeamInfo {
  name: string;
  time: number;
  position: number;
}

interface StudentInfo {
  name: string;
  time: number;
  position: number;
}

const teamInfo: TeamInfo[] = [
  { name: "Equipo 1", time: 0.02, position: 1 },
  { name: "Equipo 2", time: 0.02, position: 2 },
  { name: "Equipo 3", time: 0.02, position: 3 },
  { name: "Equipo 4", time: 0.02, position: 4 },
  { name: "Equipo 5", time: 0.02, position: 5 },
  { name: "Equipo 6", time: 0.02, position: 6 },
];

const studentInfo: StudentInfo[] = [
  { name: "Estudiante 1", time: 0.02, position: 1 },
  { name: "Estudiante 4", time: 0.02, position: 2 },
  { name: "Estudiante 5", time: 0.02, position: 3 },
  { name: "Estudiante 2", time: 0.02, position: 4 },
  { name: "Estudiante 3", time: 0.02, position: 5 },
  { name: "Estudiante 6", time: 0.02, position: 6 },
];

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

  const dataToDisplay = activeTab === "equipos" ? teamInfo : studentInfo;

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
              <span className="position">{item.position}</span>

              <div className={getTimeContainerClass(item.position)}>
                <span className="time">{item.time.toFixed(2)}s</span>
              </div>
              <span className="name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
