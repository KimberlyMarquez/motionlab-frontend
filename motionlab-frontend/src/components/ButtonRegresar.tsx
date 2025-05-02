import './ButtonRegresar.css';

interface Props {
  label: string;
  onClick?: () => void;
}

const CustomButton = ({ label, onClick }: Props) => {
  return (
    <button className="regresarbutton"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;