import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarUser from '../components/common/navbar/UserNavbar';
import FilterSidebar from '../components/user/filter/FilterSidebar';
import Footer from '../components/common/footer/Footer';

const UserLayout = () => {
    return (
        <>
            <NavbarUser />
           
                    <Outlet />
    
            {/* <Footer /> */}
        </>
    );
}

export default UserLayout;
