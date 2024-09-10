import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarUser from '../components/common/navbar/UserNavbar';
import Footer from '../components/common/footer/Footer';
const UserLayout = () => {
    return (
        <>
            <NavbarUser />

            <div className='pt-8  pb-16 min-h-screen'>
                <Outlet />
            </div>


            <Footer />
        </>
    );
}

export default UserLayout;
