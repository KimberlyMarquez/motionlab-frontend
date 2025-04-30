import { useState, useEffect } from 'react';
import LobbyContainer from '../components/LobbyContainer';
import IconWithText from '../components/IconWithText';
import { FaUser, FaUsers, FaTrashAlt } from 'react-icons/fa';
import CustomButton from '../components/ButtonOrange';
import { getLobbyTeams, deleteTeamFromLobby } from '../api/lobbyAPI';
import '../pages/Pages.css';

interface Equipo {
  nombre: string;
  matriculas: string[];
  teamId: number;
}

const LobbyProfesor = () => {
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

      // Solo actualizar si hay cambios
      const mismosEquipos = JSON.stringify(nuevosEquipos) === JSON.stringify(equipos);
      if (!mismosEquipos) {
        setEquipos(nuevosEquipos);
      }
    } else {
      console.error(res.message);
    }

    if (showLoading) setLoading(false);
  };

  useEffect(() => {
    if (!matchId) return;

    fetchEquipos(true); // Llamada inicial con loading

    const intervalId = setInterval(() => {
      fetchEquipos(); // Sin loading
    }, 3000);

    return () => clearInterval(intervalId);
  }, [matchId]);

  const eliminarEquipo = async (index: number) => {
    const equipo = equipos[index];
    const confirmacion = window.confirm(`¿Eliminar ${equipo.nombre}?`);
    if (!confirmacion) return;

    try {
      const res = await deleteTeamFromLobby(equipo.teamId.toString());
      if (res.status === "success") {
        await fetchEquipos(true);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error("Error al eliminar equipo:", error);
    }
  };

  const totalAlumnos = equipos.reduce((acc, eq) => acc + eq.matriculas.length, 0);
  const totalEquipos = equipos.length;

  return (
    <div className="background-container">
      <div className="main-content">
        <LobbyContainer label={codigo} pag_anterior="/">
          <div className="info-icons">
            <IconWithText icon={<FaUser size={30} />} text={totalAlumnos} />
            <div className="d-flex align-items-center gap-2 bg-personalized px-3 py-1">
              <FaUsers size={40} color="#fff" />
              <span className="text-white fw-bold" style={{ fontFamily: '"Jersey 20", sans-serif', fontSize: '2rem' }}>
                {totalEquipos}
              </span>
            </div>
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
              {equipos.map((equipo, i) => (
                <div key={i} className="equipo-card position-relative">
                  <button
                    onClick={() => eliminarEquipo(i)}
                    className="boton-eliminar position-absolute top-0 start-50 translate-middle"
                  >
                    <FaTrashAlt />
                  </button>

                  <h5 className="equipo-title">{equipo.nombre}</h5>

                  <div className="integrantes-list shadow">
                    {equipo.matriculas.length > 0 ? (
                      equipo.matriculas.map((mat, idx) => (
                        <div key={idx} className="integrante-name">
                          {mat}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted" style={{ fontSize: '0.9rem' }}>Sin alumnos</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="start-button-fixed">
            <CustomButton
              label="START"
              onClick={() => console.log("Iniciar")}
              disabled={equipos.length === 0}
            />
          </div>
        </LobbyContainer>
      </div>
    </div>
  );
};

export default LobbyProfesor;

