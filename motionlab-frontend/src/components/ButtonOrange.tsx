interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<Props> = ({ label, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#b86c4f" : "#E77951",
        color: "#fff",
        borderRadius: "12px",
        border: "4px solid #C85332",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        fontFamily: '"Jersey 20", sans-serif',
        fontSize: "3.2rem",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {label}
    </button>
  );
};

export default CustomButton;