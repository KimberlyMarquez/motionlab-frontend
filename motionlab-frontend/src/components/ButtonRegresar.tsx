import './ButtonRegresar.css';

interface Props {
    label: string;
    onClick?: () => void;
  }
  
  const CustomButton: React.FC<Props> = ({ label, onClick }) => {
    return (
      <button className="regresarbutton"
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default CustomButton;