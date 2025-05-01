import { useState, useEffect } from "react";
import LobbyContainer from "../components/LobbyContainer";
import IconWithText from "../components/IconWithText";
import { FaUser, FaUsers, FaTrashAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import CustomButton from "../components/ButtonOrange";
import { getLobbyTeams, deleteTeamFromLobby } from "../api/lobbyAPI";
import { changeMatchStatus, getMatchStatus } from "../api/MatchAPI";
import { createRound } from "../api/rondaAPI";
import "../pages/Pages.css";

interface Equipo {
  nombre: string;
  matriculas: string[];
  teamId: number;
}

const LobbyProfesor = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchActive, setMatchActive] = useState(false);
  const roundsAmount = Number(sessionStorage.getItem("rounds")) || 1;
  const [startCount, setStartCount] = useState(0);

  const codigo = sessionStorage.getItem("codigo") || "SIN-CÓDIGO";
  const matchId = sessionStorage.getItem("matchId");

  const handleStartClick = async () => {
    if (!matchId) return;

    try {
      const responseStatus = await changeMatchStatus(parseInt(matchId), true);
      if (responseStatus.status === "success") {
        console.log("Partida iniciada");

        const responseRound = await createRound(parseInt(matchId));
        if (responseRound.status === "success") {
          console.log("Ronda creada exitosamente:", responseRound.payload);
          setStartCount((prev) => prev + 1);
        } else {
          console.error("Error al crear la ronda:", responseRound.message);
        }
      } else {
        console.error("Error al iniciar la partida:", responseStatus.message);
      }
    } catch (error) {
      console.error("Error al iniciar partida o crear ronda:", error);
    }
  };

  const fetchMatchStatus = async () => {
    if (!matchId) return;
    try {
      const res = await getMatchStatus(parseInt(matchId));
      if (res.status === "success") {
        setMatchActive(res.payload === true);
      } else {
        console.error("Error al obtener estado del match:", res.message);
      }
    } catch (error) {
      console.error("Error al obtener estado del match:", error);
    }
  };

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
      const mismosEquipos =
        JSON.stringify(nuevosEquipos) === JSON.stringify(equipos);
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
    if (!matchId) return;

    fetchEquipos(true);
    fetchMatchStatus(); // Llamada inicial

    const intervalId = setInterval(() => {
      fetchEquipos();
      fetchMatchStatus();
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

  const totalAlumnos = equipos.reduce(
    (acc, eq) => acc + eq.matriculas.length,
    0
  );
  const totalEquipos = equipos.length;

  return (
    <div className="background-container">
      <div className="main-content">
        <LobbyContainer label={codigo} pag_anterior="/">
          <div className="info-icons">
            <IconWithText
              icon={<IoIosStats size={40} />}
              text=""
              onClick={() => window.open("/estadisticas", "_blank")}
              className="icon-button-style"
            />
            <IconWithText icon={<FaUser size={30} />} text={totalAlumnos} />
            <IconWithText icon={<FaUsers size={40} />} text={totalEquipos} />
          </div>

          {loading ? (
            <p className="text-center mt-3">Cargando equipos...</p>
          ) : equipos.length === 0 ? (
            <p className="text-center mt-4 text-muted">
              Aún no hay equipos creados
            </p>
          ) : (
            <div
              className="equipos-grid-container"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                justifyItems: "center",
                gap: "2rem",
                padding: "0 2rem",
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
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        Sin alumnos
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="start-button-fixed text-center">
            <CustomButton
              label={`START`}
              onClick={async () => {
                await handleStartClick();
              }}
              ronda={`Ronda ${startCount}/${roundsAmount}`}
              disabled={
                equipos.length === 0 ||
                startCount >= roundsAmount ||
                matchActive
              }
            />
          </div>
        </LobbyContainer>
      </div>
    </div>
  );
};

export default LobbyProfesor;
