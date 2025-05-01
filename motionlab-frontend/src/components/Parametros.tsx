import { useState , useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import './Parametros.css';

interface Props {
    label: string;
    unidad: string;
    valorInicial: number;
    step: number;
    min: number;
    max: number;
    onChange: (valor: number) => void;
}

const Parametros = ({ label, unidad, valorInicial, step, min, max, onChange}: Props) => {
    const [valor, setValor] = useState(valorInicial);

    const reset = () => setValor(valorInicial);

    useEffect(() => {
        onChange(valor);
    }, [valor, onChange]);

    return (
        <div className="parametro-container">
            <div className="parametro-label">
                {label} <span className="unidad">({unidad})</span>
            </div>
            <div className="parametro-controls">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="slider"
                />
                <input
                    type="number"
                    value={valor}
                    onChange={(e) => {
                        let newValue = e.target.value;
                        
                        if (newValue.includes(".")) {
                          const [entero, decimales] = newValue.split(".");
                          if (decimales.length > 2) {
                            newValue = `${entero}.${decimales.slice(0, 2)}`;
                          }
                        }
                    
                        setValor(Number(newValue));
                      }}
                      onBlur={() => {
                        if (valor < min) {
                          alert(`El valor no puede ser menor a ${min}`);
                          setValor(min);
                        }
                        if (valor > max) {
                          alert(`El valor no puede ser mayor a ${max}`);
                          setValor(max);
                        }
                      }}
                    className="input-box"
                />
                <button className="reset-btn" onClick={reset}>
                    <FontAwesomeIcon icon={faSync} />
                </button>
            </div>
        </div>
    );
};

export default Parametros;
