import { Typography } from "@material-tailwind/react";
import { 
  AcademicCapIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

const links = [
  { name: "Shop", href: "#" },
  { name: "Customer Support", href: "#" },
  { name: "Shipping & Returns", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Terms & Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const socialLinks = [
  { name: "Facebook", icon: <AcademicCapIcon className="h-6 w-6" />, href: "#" },
  { name: "Instagram", icon: <CurrencyDollarIcon className="h-6 w-6" />, href: "#" },
  { name: "Twitter", icon: <UserGroupIcon className="h-6 w-6" />, href: "#" },
  { name: "LinkedIn", icon: <ShieldCheckIcon className="h-6 w-6" />, href: "#" },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-8 py-20">
      <div className="container mx-auto flex flex-col items-center">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 pb-8">
          {links.map((link, index) => (
            <ul key={index}>
              <li>
                <Typography
                  as="a"
                  href={link.href}
                  color="white"
                  className="font-medium !text-gray-500 transition-colors hover:!text-white"
                >
                  {link.name}
                </Typography>
              </li>
            </ul>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4 mb-8">
          {socialLinks.map((social, index) => (
            <a key={index} href={social.href} className="hover:text-gray-400">
              {social.icon}
            </a>
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
