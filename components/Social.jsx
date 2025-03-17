import Link from "next/link";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const socials = [
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/in/hamza-dev-tech",
  },
  { icon: <FaGithub />, path: "https://github.com/hamza-dev-tech" },

  { icon: <FaYoutube />, path: "https://www.youtube.com/@hamza-dev-tech" },
  { icon: <FaWhatsapp />, path: "https://wa.me/923168809943" }, // Updated WhatsApp Link
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles} style={{ paddingTop: "15%" }}>
      {socials.map((item, index) => {
        if (!item.path) return null; // Hide icons with empty paths
        return (
          <Link
            href={item.path}
            key={index}
            className={iconStyles}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
