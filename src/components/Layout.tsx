import React, { Fragment } from 'react';

import Footer from './Footer';


const Layout: React.FC = ({ children }) => (
  <Fragment>
    <main className="container">
      {children}
    </main>
    <Footer />
  </Fragment>
);

export default Layout;