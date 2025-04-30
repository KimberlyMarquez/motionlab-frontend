import React, { useState } from "react";
import './CustomButtonT4.css';

interface Props {
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<Props> = ({ label, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button className="custombutton"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;