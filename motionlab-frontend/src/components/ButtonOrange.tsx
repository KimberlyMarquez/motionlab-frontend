interface Props {
    label: string;
    onClick?: () => void;
  }
  
  const CustomButton: React.FC<Props> = ({ label, onClick }) => {
    return (
      <button
        className="fw-bold"
        style={{
          backgroundColor: "#E77951",
          color: "#fff",
          borderRadius: "12px",
          border: "4px solid #C85332",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          fontFamily: '"Jersey 20", sans-serif',
          fontSize: "3.2rem",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default CustomButton;