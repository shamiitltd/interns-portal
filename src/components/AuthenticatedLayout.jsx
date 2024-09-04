import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Logout from './logout';

function AuthenticatedLayout({ children }) {
  return (
    <div className="authenticated-layout">
      <Sidebar />
      <div className="main-content">
        <Header>
          <Logout />
        </Header>
        <main>{children}</main>
        <footer>{/* Add your footer content here if needed */}</footer>
      </div>
    </div>
  );
}

export default AuthenticatedLayout;
