import '../components/Ajustes.css';

interface ControlProps {
  label: React.ReactNode;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Control = ({ label, value, onIncrement, onDecrement }: ControlProps) => (
  <div className="text-center mb-4">

    <h2 className="fw-bold mb-3" style={{ color: '#547EBC', fontSize: '2.5rem', fontFamily: '"Inter", sans-serif' }}>
      {label}
    </h2>

    <div className="container-valores d-flex align-items-center justify-content-center gap-3">

      <button className="btn-inc-dec px-3" onClick={onDecrement}><img src="./minus.svg" alt="" style={{ marginBottom: '5px' }} /></button>

      <span className="valor-eq-int">
        {value}
      </span>

      <button className="btn-inc-dec px-3" onClick={onIncrement}><img src="./plus.svg" alt="" style={{ marginBottom: '5px' }} /></button>

    </div>

  </div>
);

export default Control;
