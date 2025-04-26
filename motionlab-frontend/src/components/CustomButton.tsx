import React from 'react';
import './CustomButton.css';

interface Props {
  label: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
  className?: string;
  style?: React.CSSProperties;
}

const CustomButton: React.FC<Props> = ({ label, onClick, type = 'button', className = '', style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custombutton ${className}`}
      style={style}
    >
      {label}
    </button>
  );
};

export default CustomButton;
