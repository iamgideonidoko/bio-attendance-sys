import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
  return <div className="main-footer">&copy; {new Date().getFullYear()}</div>;
};

export default Footer;
