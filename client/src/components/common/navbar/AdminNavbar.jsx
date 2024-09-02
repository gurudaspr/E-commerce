import React from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen((cur) => !cur);

  const handleLogout = () => {
    // Add logout functionality here, e.g., clearing tokens, redirecting
    navigate("/logout");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <Navbar color="transparent" fullWidth className="shadow-md bg-gray-900">
      <div className="container mx-auto flex items-center justify-between text-gray-300">
        <Typography
          color="text-gray-300"
          className="mr-4 cursor-pointer text-2xl font-bold"
        >
          Admin Dashboard
        </Typography>
        <div className="block">
          <Button color="red" className="lg:inline-block" onClick={handleLogout}>
            Logout
          </Button>
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
    </Navbar>
  );
};

export default AdminNavbar;
