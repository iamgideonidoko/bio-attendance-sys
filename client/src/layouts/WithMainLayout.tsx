import React from 'react';
import type { FC, ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WithMainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-layout-wrapper">{children}</div>
      <Footer />
    </>
  );
};

export default WithMainLayout;
