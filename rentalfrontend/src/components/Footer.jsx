import {
  EmailOutlined,
  Facebook,
  Instagram,
  LocalPhoneOutlined,
  LocationOnOutlined,
  Phone,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import React from "react";
import {motion} from "framer-motion";

const Footer = () => {
  const socialStyle = "m-3 rounded-full cursor-pointer p-2 text-white";
  return (
    <motion.div
    initial={{ height: 0 }}
    whileInView={{ height: "auto" }}
    transition={{ duration: 1 }}
    className="bg-Solitude p-10"
  >
    <div className="flex items-center justify-around p-2 mobile:flex-col mobile:items-start">
      <div className="flex-1 flex flex-col flex-wrap p-2">
        <h1 className="text-[25px]">Rent A Book</h1>
        <p>
          We are the only book rental store in Nepal and we promise to help our
          customers. We can keep in touch with following platforms.
        </p>
        <div className="flex items-center justify-center mt-3 self-start">
          <div className={socialStyle + ` bg-blue-700`}>
            <Facebook />
          </div>
          <div className={socialStyle + ` bg-orange-500`}>
            <Instagram />
          </div>
          <div className={socialStyle + ` bg-sky-400`}>
            <Twitter />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-2">
        <div className="flex m-3">
          <LocationOnOutlined className="text-[#8a4af3]" />
          <p className="pl-3">Kathmandu, Nepal</p>
        </div>
        <div className="flex m-3">
          <LocalPhoneOutlined className="text-[#521da8]" />
          <p className="pl-3">+97712345678</p>
        </div>
        <div className="flex m-3">
          <EmailOutlined className="text-[#8a4af3]" />
          <p className="pl-3">rentabooknepal@gmail.com</p>
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default Footer;
