import { useState } from "react";
import './CustomButtonT4.css';

interface Props {
  label: string;
  onClick?: () => void;
}

const CustomButton = ({ label, onClick }: Props) => {
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