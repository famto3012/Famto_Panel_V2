import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AgentIcon,
  BikeIcon,
  BookIcon,
  HomeIcon,
  PercentageIcon,
  ProductIcon,
  ShopIcon,
  UsersIcon,
  WhatsappIcon,
} from "../../utils/icons";
import { role } from "../../utils/testData";

const SmallSideBar = () => {
  const [selectedLink, setSelectedLink] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="fixed w-[4rem] h-full bg-gradient-to-b from-[#016B6C] to-[#000] bg-[length:100%_150%] bg-top font-poppins overflow-y-auto">
      <div className="flex gap-3 ml-[18px] mt-[30px] w-[30px]">
        <div
          className="w-[140px] h-[30px] bg-gray-300 animate-pulse"
          style={{ display: isImageLoaded ? "none" : "block" }}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Fwhitelogo.svg?alt=media&token=a7436647-2de7-4fee-8e3a-5c637bd0bc61"
          alt="Logo"
          className="w-[140px]"
          style={{ display: isImageLoaded ? "block" : "none" }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="dropside"></div>

      <ul className="ul-side">
        <Link to="/home" className="side">
          <HomeIcon className="m-2" size={24} />
        </Link>
        <Link
          to="/order"
          className={`side ${selectedLink === "/order" || /^\/order\/[A-Za-z0-9]+$/.test(selectedLink) ? "selected-link" : ""}`}
        >
          <BookIcon className="m-2" size={24} />
        </Link>
        <Link
          to="/merchant"
          className={`side ${
            selectedLink === "/merchant/payout" ? "selected-link" : ""
          }`}
        >
          <ShopIcon className="m-2" size={24} />
        </Link>
        <Link to="/product" className="side">
          <ProductIcon className="m-2" size={24} />
        </Link>
        <Link to="/customer" className="side">
          <UsersIcon className="m-2" size={24} />
        </Link>
        <Link
          to="/agent"
          className={`side ${
            selectedLink === "/agent/payout" ? "selected-link" : ""
          }`}
        >
          <AgentIcon className="m-2" size={24} />
        </Link>
        <Link
          to="/delivery-management"
          className={` side ${
            selectedLink === "/delivery-management" ? "selected-link" : ""
          }`}
        >
          <BikeIcon className="m-2" size={24} />
        </Link>
        <Link to="/comm-and-subs" className="side">
          <PercentageIcon className="m-2" size={24} />
        </Link>
        {role === "Admin" && (
          <Link
            to="/chat"
            className={` side ${
              selectedLink === "/chat" ? "selected-link" : ""
            }`}
          >
            <WhatsappIcon className="m-2" size={24} />
          </Link>
        )}
      </ul>
    </div>
  );
};

export default SmallSideBar;
