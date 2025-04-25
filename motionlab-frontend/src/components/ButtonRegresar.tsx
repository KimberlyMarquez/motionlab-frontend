interface Props {
    label: string;
    onClick?: () => void;
  }
  
  const CustomButton: React.FC<Props> = ({ label, onClick }) => {
    return (
      <button
        className="fw-bold"
        style={{
            backgroundColor: '#92B3E6',
            color: 'white',
            fontFamily: "'Jersey 20', sans-serif",
            fontSize: '1.6rem',
            padding: '0rem 2rem',
            borderRadius: '16px',
            border: '5px solid #6B95D6',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            letterSpacing: '1px'
        }}
        onClick={onClick}
      >
        {label}
      </button>
    );
  };
  
  export default CustomButton;