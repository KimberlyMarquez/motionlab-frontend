import React from "react";

interface ControlProps {
  label: React.ReactNode;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Control: React.FC<ControlProps> = ({ label, value, onIncrement, onDecrement }) => (
  <div className="text-center mb-4">
    <h2 className="fw-bold mb-3" style={{ color: '#547EBC', fontSize: '2.5rem'}}>{label}</h2>
    <div className="d-flex align-items-center justify-content-center gap-3" style={{backgroundColor: 'white', borderRadius: '10px', display: 'inline-flex'}}>
      <button className="btn btn-outline-secondary rounded-circle px-3" style={{ color: '#D4633C' }} onClick={onDecrement}>−</button>
      <span style={{ fontSize: '3rem', fontFamily: '"Jersey 20", sans-serif', fontWeight: 'bold', color: '#D4633C' }}>{value}</span>
      <button className="btn btn-outline-secondary rounded-circle px-3" style={{ color: '#D4633C' }} onClick={onIncrement}>+</button>
    </div>
  </div>
);

export default Control;
