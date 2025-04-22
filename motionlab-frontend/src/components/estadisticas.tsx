import React, { useState } from 'react';
import './estadisticas.css';

// Tipos de datos
interface TeamData {
  team: string;
  totalPlays: number;
  avgTime: number;
  avgPlaceToday: number;
  avgPlaceHistoric: number;
}

interface StudentData {
  student: string;
  team: string;
  totalPlays: number;
  avgTime: number;
  avgPlaceToday: number;
  avgPlaceHistoric: number;
}

// Datos de equipos
const teamData: TeamData[] = [
  { team: 'Equipo 1', totalPlays: 12, avgTime: 1.3, avgPlaceToday: 2, avgPlaceHistoric: 3 },
  { team: 'Equipo 2', totalPlays: 10, avgTime: 1.8, avgPlaceToday: 1, avgPlaceHistoric: 4 },
  { team: 'Equipo 3', totalPlays: 11, avgTime: 1.2, avgPlaceToday: 4, avgPlaceHistoric: 2 },
  { team: 'Equipo 4', totalPlays: 13, avgTime: 1.8, avgPlaceToday: 3, avgPlaceHistoric: 1 },
  { team: 'Equipo 5', totalPlays: 11, avgTime: 1.5, avgPlaceToday: 6, avgPlaceHistoric: 5 },
  { team: 'Equipo 6', totalPlays: 11, avgTime: 1.3, avgPlaceToday: 6, avgPlaceHistoric: 6 },
];

// Datos de alumnos
const studentData: StudentData[] = [
  { student: 'AXXXX', team: '1', totalPlays: 4, avgTime: 1.8, avgPlaceToday: 2, avgPlaceHistoric: 2 },
  { student: 'AXXXX', team: '4', totalPlays: 1, avgTime: 1.9, avgPlaceToday: 3, avgPlaceHistoric: 1 },
  { student: 'AXXXX', team: '2', totalPlays: 4, avgTime: 1.2, avgPlaceToday: 1, avgPlaceHistoric: 3 },
  { student: 'AXXXX', team: '2', totalPlays: 4, avgTime: 1.5, avgPlaceToday: 2, avgPlaceHistoric: 2 },
  { student: 'AXXXX', team: '3', totalPlays: 4, avgTime: 0.9, avgPlaceToday: 4, avgPlaceHistoric: 1 },
];

const Statistics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'equipos' | 'alumnos'>('equipos');

  return (
    <div className="container">
      <div className="header">ESTADÍSTICAS</div>

      <div className="actions-container">
        <button className="btn-return">&lt; Regresar</button>
        <div className="icon-buttons">
          <button className="icon-btn">⬇️</button>
          <button className="icon-btn">👑</button>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'equipos' ? 'tab-equipos' : ''}`}
          onClick={() => setActiveTab('equipos')}
        >
          Equipos
        </button>
        <button
          className={`tab-btn ${activeTab === 'alumnos' ? 'tab-alumnos' : ''}`}
          onClick={() => setActiveTab('alumnos')}
        >
          Alumnos
        </button>
      </div>

      <div className="table-container">
        {activeTab === 'equipos' ? (
          <TeamsTable data={teamData} />
        ) : (
          <StudentsTable data={studentData} />
        )}
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
