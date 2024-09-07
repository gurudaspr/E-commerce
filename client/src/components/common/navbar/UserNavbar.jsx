import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, UserIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function NavItem({ label }) {
    const path = label === "Home" ? "/" : `/${label.toLowerCase()}`;
    return (
        <Link to={path}>
            <Typography as="li" color="blue-gray" className="p-1 font-semibold hover:opacity-80 ease-in-out duration-200">
                {label}
            </Typography>
        </Link>
    );
}

function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
            <NavItem label="Home" />
            <NavItem label="Products" />
        </ul>
    );
}

const NavbarUser = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);

    return (
        <Navbar  fullWidth className="fixed z-50  ">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as={Link}
                    to="/"
                    color="blue-gray"
                    className="mr-4 cursor-pointer text-2xl font-bold"
                >
                    ZestaMart
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/cart">
                        <IconButton variant="text" color="blue-gray-900">
                            <ShoppingCartIcon className="h-8 w-8 text-green-700" />
                        </IconButton>
                    </Link>
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" color="blue-gray-900">
                                <FaUser  className="h-6 w-6 text-orange-900" />
                            </IconButton>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={() => navigate('/profile')}>View Profile</MenuItem>
                            <MenuItem onClick={() => navigate('/orders')}>Orders</MenuItem>
                            <MenuItem onClick={() => { handleLogut }} >Logout</MenuItem>

                        </MenuList>
                    </Menu>

                </div>
                <IconButton
                    size="sm"
                    variant="text"
                    color="blue-gray"
                    onClick={handleOpen}
                    className="ml-auto inline-block text-blue-gray-900 lg:hidden"
                >
                    {open ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={open}>
                <div className="mt-2 rounded-xl bg-white py-2">
                    <NavList />
                    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
                        <NavItem label="Cart" />
                        <NavItem label="Profile" />
                    </ul>
                </div>
            </Collapse>
        </Navbar>
    );
}

export default NavbarUser;
