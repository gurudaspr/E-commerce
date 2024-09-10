import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuthStore } from '../../../store/useAuthStore';

const links = [
  { name: "Shop", to: "/products" },
  { name: "Customer Support", to: "/customer-support" },
  { name: "Shipping & Returns", to: "/shipping-returns" },
  { name: "FAQ", to: "/faq" },
  { name: "Terms & Conditions", to: "/terms-and-conditions" },
  { name: "Privacy Policy", to: "/privacy-policy" },
];

const Footer = () => {
  const { isAuthenticated } = useAuthStore();

  // If authenticated, prepend '/user' to the route paths
  const modifiedLinks = links.map(link => ({
    ...link,
    to: isAuthenticated ? `/user${link.to}` : link.to,
  }));

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white px-8 py-16 ">
      <div className="container mx-auto flex flex-col items-center">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 pb-4">
          {modifiedLinks.map((link, index) => (
            <ul key={index}>
              <li>
                <Typography
                  as={Link}
                  to={link.to}
                  color="white"
                  className="font-medium !text-gray-500 transition-colors hover:!text-white"
                >
                  {link.name}
                </Typography>
              </li>
            </ul>
          ))}
        </div>

        {/* Copyright */}
        <Typography
          color="blue-gray"
          className="mt-6 !text-sm !font-normal text-gray-500"
        >
          &copy; {currentYear} Zesta-Mart
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
