import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarCommon from '../components/common/navbar/Navbar'
import Footer from '../components/common/footer/Footer'

const HomeLayout = () => {
    return (
        <>
            <NavbarCommon />
            <div className='pt-8  pb-16 min-h-screen'>
                <Outlet />
                </div>
            
            <Footer />
        </>
    )
}

export default HomeLayout