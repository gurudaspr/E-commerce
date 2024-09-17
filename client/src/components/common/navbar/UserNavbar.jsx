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
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Avatar from 'react-avatar';
import { useAuthStore } from "../../../store/useAuthStore";
import { useUserStore } from "../../../store/useUserStore";
import toast from "react-hot-toast";

function NavItem({ label, path }) {
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
            <NavItem label="Home" path="/user/home" />
            <NavItem label="Products" path="/user/products" />
        </ul>
    );
}

const NavbarUser = () => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const { logout } = useAuthStore(state => ({
        logout: state.logout,
    }));
    const { name } = useUserStore(state => ({
        name: state.name,
    }));
    const clearUser = useUserStore(state => state.clearUser);

    const handleOpen = () => setOpen(cur => !cur);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLogout = () => {
        clearUser();
        logout();
        navigate("/", { replace: true });
        toast.success('You have been logged out successfully');
    };

    const firstLetter = name ? name.charAt(0).toUpperCase() : '';

    return (
        <Navbar fullWidth className="fixed z-50">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as={Link}
                    to="/user/home"
                    color="blue-gray"
                    className="mr-4 cursor-pointer text-2xl font-bold"
                >
                    ZestaMart
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <div className="hidden lg:flex items-center gap-4">
                    <Link to="/user/cart">
                        <IconButton variant="text" color="blue-gray">
                            <ShoppingCartIcon className="h-8 w-8 text-green-700" />
                        </IconButton>
                    </Link>
                    <Menu>
                        <MenuHandler>
                            <IconButton variant="text" color="blue-gray">
                                <Avatar
                                    name={firstLetter}
                                    size="38"
                                    round={true}
                                    color="#000000"
                                    textSizeRatio={2}
                                />
                            </IconButton>
                        </MenuHandler>
                        <MenuList>
                            <MenuItem onClick={() => navigate('/user/profile')}>View Profile</MenuItem>
                            <MenuItem onClick={() => navigate('/user/orders')}>Orders</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
                <div className="mt-2 rounded-xl bg-transparent py-2 px-4">
                    <ul className="flex flex-col gap-4">
                        <NavItem label="Profile" path="/user/profile" />
                       <hr className=" bg-black "  />
                        <NavItem label="Home" path="/user/home" />
                        <NavItem label="Products" path="/user/products" />
                        <NavItem label="Cart" path="/user/cart" />
                        <Button
                            size="sm"
                            fullWidth
                            className="mt-4"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </ul>
                </div>
            </Collapse>
        </Navbar>
    );
};

export default NavbarUser;