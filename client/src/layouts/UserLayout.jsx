import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarUser from '../components/common/navbar/UserNavbar'

const UserLayout = () => {
    return (
        <>  
            <NavbarUser/>
            <div className='pt-2'>
            <Outlet />
            </div>
        </>

    )
}

export default UserLayout