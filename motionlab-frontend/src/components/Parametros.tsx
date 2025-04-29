import { useState , useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import './Parametros.css';

interface Props {
    label: string;
    unidad: string;
    valorInicial: number;
    min: number;
    max: number;
    onChange: (valor: number) => void;
}

const ParametrosControl = ({ label, unidad, valorInicial, min, max, onChange}: Props) => {
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
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="slider"
                />
                <input
                    type="number"
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="input-box"
                />
                <button className="reset-btn" onClick={reset}>
                    <FontAwesomeIcon icon={faSync} />
                </button>
            </div>
        </div>
    );
};

export default ParametrosControl;
