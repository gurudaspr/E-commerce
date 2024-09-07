import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarUser from '../components/common/navbar/UserNavbar';
import FilterSidebar from '../components/user/filter/FilterSidebar';
import Footer from '../components/common/footer/Footer';

const UserLayout = () => {
    return (
        <>
            <NavbarUser />
            <div className='flex pt-24'>
                <div className=' md:w-1/6'>
                    <FilterSidebar />
                </div>
                <div className='w-full md:w-3/4 '>
                    <Outlet />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default UserLayout;
