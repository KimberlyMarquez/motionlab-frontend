import { useState, useEffect } from 'react';
import LobbyContainer from '../components/LobbyContainer';
import { useLocation } from 'react-router-dom';
import IconWithText from '../components/IconWithText';
import { FaUser, FaUsers, FaTrashAlt } from 'react-icons/fa';
import CustomButton from '../components/ButtonOrange';
import { getLobbyTeams, deleteTeamFromLobby } from '../api/lobbyAPI';
import '../pages/Pages.css';

interface Equipo {
  nombre: string;
  matriculas: string[];
  teamId?: number;
}

const LobbyProfesor = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const codigo = location.state?.codigo || 'SIN-CÓDIGO';
  const matchId = location.state?.matchId || null;
  const totalEquiposPlaneados = location.state?.teams || 0;

  useEffect(() => {
    const fetchEquipos = async () => {
      if (!matchId || !totalEquiposPlaneados) return;

      setLoading(true);
      const res = await getLobbyTeams(matchId.toString());

      if (res.status === "success") {
        const equiposReales = res.payload.map((team: any, idx: number) => ({
          nombre: `Equipo ${idx + 1}`,
          matriculas: team.students.map((s: any) => `A${s.id}`),
          teamId: team.teamId,
        }));

        const faltan = totalEquiposPlaneados - equiposReales.length;
        const vacios: Equipo[] = Array.from({ length: faltan > 0 ? faltan : 0 }, (_, i) => ({
          nombre: `Equipo ${equiposReales.length + i + 1}`,
          matriculas: [],
        }));

        const equiposFinales = [...equiposReales, ...vacios];

        setEquipos(equiposFinales);
      } else {
        console.error(res.message);
      }
      setLoading(false);
    };

    fetchEquipos();
  }, [matchId, totalEquiposPlaneados]);

  const eliminarEquipo = async (index: number) => {
    const equipo = equipos[index];

    if (!equipo.teamId) return; // No borrar si es equipo inventado (vacío)

    try {
      const res = await deleteTeamFromLobby(equipo.teamId.toString());
      if (res.status === "success") {
        const copia = [...equipos];
        copia.splice(index, 1);
        setEquipos(copia);
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
            {loading ? (
              <p>Cargando equipos...</p>
            ) : equipos.map((equipo, i) => (
              <div key={i} className="equipo-card position-relative">
                {equipo.teamId && (
                  <button
                    onClick={() => eliminarEquipo(i)}
                    className="boton-eliminar position-absolute top-0 start-50 translate-middle"
                  >
                    <FaTrashAlt />
                  </button>
                )}

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
