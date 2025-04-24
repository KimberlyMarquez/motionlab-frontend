import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer text-center">
      ©{year} <strong>MotionLab</strong> All rights reserved
    </footer>
  );
};

export default Footer;