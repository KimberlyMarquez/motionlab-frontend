import React, { useState } from "react";

interface Props {
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<Props> = ({ label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        width: "24%",
        backgroundColor: isHovered ? "#4971B4" : "#547EBC",
        color: "#fff",
        borderRadius: "12px",
        border: "4px solid #4971B4",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        fontFamily: '"Jersey 20", sans-serif',
        fontSize: "2.4rem",
        letterSpacing: "1px",
        padding: "0rem",
        cursor: "pointer", 
        transition: "background-color 0.3s ease", 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;