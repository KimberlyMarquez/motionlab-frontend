import { useState, useEffect } from 'react';
import LobbyContainer from '../components/LobbyContainer';
import IconWithText from '../components/IconWithText';
import { FaUser, FaUsers } from 'react-icons/fa';
import { getLobbyTeams } from '../api/lobbyAPI';
import '../pages/Pages.css';

interface Equipo {
  nombre: string;
  matriculas: string[];
  teamId: number;
}

const LobbyAlumnos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);

  const codigo = sessionStorage.getItem("codigo") || "SIN-CÓDIGO";
  const matchId = sessionStorage.getItem("matchId");

  const fetchEquipos = async (showLoading = false) => {
    if (!matchId) return;
  
    if (showLoading) setLoading(true);
    const res = await getLobbyTeams(matchId);
  
    if (res.status === "success") {
      const nuevosEquipos = res.payload.map((team: any, idx: number) => ({
        nombre: `Equipo ${idx + 1}`,
        matriculas: team.student_ids || [],
        teamId: team.team_id,
      }));
  
      const mismosEquipos = JSON.stringify(nuevosEquipos) === JSON.stringify(equipos);
      if (!mismosEquipos) {
        setEquipos(nuevosEquipos);
      }

      console.log("Equipos actualizados");
    } else {
      console.error(res.message);
    }
  
    if (showLoading) setLoading(false);
  };
  

  useEffect(() => {
    fetchEquipos(true); // Llamada inicial
    const interval = setInterval(() => fetchEquipos(), 3000); // Actualización cada 3s
    return () => clearInterval(interval); // Limpieza
  }, []);

  const totalEquipos = equipos.length;
  const totalAlumnos = equipos.reduce((acc, eq) => acc + eq.matriculas.length, 0);

  return (
    <div className="background-container">
      <div className="main-content">
        <LobbyContainer label={codigo} pag_anterior="/">
          <div className="info-icons">
            <IconWithText icon={<FaUser size={30} />} text={totalAlumnos} />
            <IconWithText icon={<FaUsers size={40} />} text={totalEquipos} />
          </div>

          {loading ? (
            <p className="text-center mt-3">Cargando equipos...</p>
          ) : equipos.length === 0 ? (
            <p className="text-center mt-4 text-muted">Aún no hay equipos creados</p>
          ) : (
            <div
              className="equipos-grid-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                justifyItems: 'center',
                gap: '2rem',
                padding: '0 2rem'
              }}
            >
              {equipos.map((equipo, index) => (
                <div key={index} className="equipo-card">
                  <h5 className="equipo-title">{equipo.nombre}</h5>
                  <div className="integrantes-list">
                    {equipo.matriculas.length > 0 ? (
                      equipo.matriculas.map((mat, idx) => (
                        <div key={idx} className="integrante-name">{mat}</div>
                      ))
                    ) : (
                      <p className="text-muted">Sin alumnos</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="loading start-50 translate-middle-x mt-4">
            Esperando a que inicie la partida...
          </div>
        </LobbyContainer>
      </div>
    </div>
  );
};

export default LobbyAlumnos;
