import { useState } from 'react';
import LobbyContainer from '../components/LobbyContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import IconWithText from '../components/IconWithText';
import { FaUser, FaUsers, FaPlus, FaTrashAlt } from 'react-icons/fa';
import CustomButton from '../components/ButtonOrange';
import '../pages/Pages.css';

const LobbyProfesor = () => {
  const [equipos, setEquipos] = useState([
    { nombre: 'Equipo 1', matriculas: ['AXXXXXXX', 'AXXXXXXX', 'AXXXXXXX', 'AXXXXXXX', 'AXXXXXXX'] },
  ]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const codigo = location.state?.codigo || 'SIN-CÓDIGO';

  const agregarEquipo = () => {
    if (equipos.length < 8) {
      const nuevo = {
        nombre: `Equipo ${equipos.length + 1}`,
        matriculas: ['AXXXXXXX', 'AXXXXXXX', 'AXXXXXXX', 'AXXXXXXX', 'AXXXXXXX'],
      };
      setEquipos([...equipos, nuevo]);
    }
  };

  const eliminarEquipo = (index: number) => {
    const copia = [...equipos];
    copia.splice(index, 1);
    setEquipos(copia);
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
              <span className="text-white fw-bold" style={{ fontFamily: '"Jersey 20", sans-serif', fontSize: '2rem' }}>{totalEquipos}</span>
              {equipos.length < 8 && (
                <button onClick={agregarEquipo} className="plus-inside-btn">
                  <FaPlus />
                </button>
              )}
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
                  {equipo.matriculas.map((mat, idx) => (
                    <div key={idx} className="integrante-name">
                      {mat}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Botón START */}
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
