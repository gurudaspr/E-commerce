import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

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

const NavbarCommon = () => {
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
    <Navbar  fullWidth className="fixed z-50 ">
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
        <Link to="/signup">
          <Button color="gray" className="hidden lg:inline-block">
            Sign Up
          </Button>
        </Link>
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
          <Button className="mb-2" fullWidth onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default NavbarCommon;
