import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarCommon from '../components/common/navbar/Navbar'
import Footer from '../components/common/footer/Footer'

const HomeLayout = () => {
    return (
        <>
            <NavbarCommon />
            <Outlet />
            <Footer />
        </>
    )
}

export default HomeLayout