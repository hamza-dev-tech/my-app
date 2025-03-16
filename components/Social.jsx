import Link from "next/link";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const socials = [
  { icon: <FaLinkedinIn />, path: "" },
  { icon: <FaGithub />, path: "" },
  { icon: <FaTwitter />, path: "" },
  { icon: <FaYoutube />, path: "" },
  { icon: <FaWhatsapp />, path: "" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles} style={{paddingTop: "10%"}}>
      {socials.map((item, index) => {
        return (
          <Link href={item.path} key={index} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
