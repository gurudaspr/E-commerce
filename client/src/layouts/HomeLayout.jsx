import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarCommon from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

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