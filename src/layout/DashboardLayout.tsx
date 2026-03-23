import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const DashboardLayout = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const toggleSidebar = () => setIsSidebarToggled(!isSidebarToggled);

  useEffect(() => {
    if (isSidebarToggled && window.innerWidth < 1200) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarToggled]);

  return (
    <div className={`dashboard-layout ${isSidebarToggled ? 'sidebar-toggled' : ''}`}>
      <Sidebar isSidebarToggled={isSidebarToggled} toggleSidebar={toggleSidebar} />
      {isSidebarToggled && <div className="menu-overlay" onClick={toggleSidebar}></div>}
      <div className="dashboard-content-col flex flex-col">
        <Header toggleSidebar={toggleSidebar} isSidebarToggled={isSidebarToggled} />

        <div className="dashboard-content-wrap">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
