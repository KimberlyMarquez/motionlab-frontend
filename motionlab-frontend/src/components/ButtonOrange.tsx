interface Props {
  label: string;
  ronda: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomButton = ({ label, onClick, disabled = false, ronda } : Props) => {
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
      <span>{label}</span>
      <div style={{ fontSize: "1.2rem", lineHeight: "1.2rem" }}>{ronda}</div>
    </button>
  );
};

export default CustomButton;