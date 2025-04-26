interface IconWithTextProps {
  icon: React.ReactNode;
  text: string | number;
}

const IconWithText: React.FC<IconWithTextProps> = ({ icon, text }) => {
  return (
    <div className="icon-with-text">
      {icon}
      <span className="icon-text">{text}</span>
    </div>
  );
};

export default IconWithText;
