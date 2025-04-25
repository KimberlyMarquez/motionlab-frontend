import '../components/Ajustes.css';

interface ControlProps {
  label: React.ReactNode;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Control: React.FC<ControlProps> = ({ label, value, onIncrement, onDecrement }) => (
  <div className="text-center mb-4">

    <h2 className="fw-bold mb-3" style={{ color: '#547EBC', fontSize: '2.5rem'}}>
        {label}
    </h2>

    <div className="container-valores d-flex align-items-center justify-content-center gap-3">
        
        <button className="btn-inc-dec px-3" onClick={onDecrement}>-</button>

        <span className="valor-eq-int">
            {value}
        </span>

        <button className="btn-inc-dec px-3" onClick={onIncrement}>+</button>

    </div>

  </div>
);

export default Control;
