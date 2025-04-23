import React from 'react';

interface Props {
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="fw-bold"
      style={{
        width: "20%",
        backgroundColor: "#547EBC",
        color: "#fff",
        borderRadius: "12px",
        border: "4px solid #4971B4",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        fontSize: "1.2rem",
        padding: "0.6rem 1rem"
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
