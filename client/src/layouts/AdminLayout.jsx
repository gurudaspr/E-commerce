import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import Content from '../pages/admin/Content';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="drawer flex lg:drawer-open">
        <Sidebar />
        <div className="flex flex-col flex-1 w-3/4">
          {/* <AdminNavbar /> */}
          <Content />

        </div>

      </div>
    </>
  );
};

export default AdminLayout;
