import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AccountIcon,
  ActivityIcon,
  AdBannerIcon,
  AgentIcon,
  AlertNotificationIcon,
  AngleRightDropDownIcon,
  BikeIcon,
  BookIcon,
  CustomizationIcon,
  GeofenceIcon,
  GiftIcon,
  HomeIcon,
  LoyaltyPointIcon,
  ManagerIcon,
  NotificationIcon,
  NotificationSettingsIcon,
  PercentageIcon,
  PricingIcon,
  ProductIcon,
  PromoCodeIcon,
  PushNotificationIcon,
  SettingsIcon,
  ShopIcon,
  UsersIcon,
  WhatsappIcon,
} from "../../utils/icons";
import { role } from "../../utils/testData";

const MainSideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedLink, setSelectedLink] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setSelectedLink(location.pathname);

    const path = location.pathname;

    if (path.includes("marketing")) {
      setOpenDropdown("marketing");
    } else if (path.includes("notification")) {
      setOpenDropdown("notification");
    } else if (path.includes("configure")) {
      setOpenDropdown("configure");
    } else if (path.includes("customize")) {
      setOpenDropdown("customize");
    } else if (path.includes("account")) {
      setOpenDropdown("account");
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const toggleSidebar = (dropdown) => () => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  return (
    <div className="fixed w-[270px] h-full bg-gradient-to-b from-[#016B6C] to-[#000] bg-[length:100%_150%] bg-top font-poppins overflow-y-auto pb-[50px] z-20 overflow-element">
      <div className="flex gap-3 ml-[10px] mt-[30px]">
        <div
          className="w-[140px] h-[40px] bg-gray-300 animate-pulse"
          style={{ display: isImageLoaded ? "none" : "block" }}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/famtowebsite.appspot.com/o/images%2FWhite.svg?alt=media&token=3d91a036-029f-4d67-816e-19b1f8dd3f6e"
          alt="Logo"
          className="w-[140px]"
          style={{ display: isImageLoaded ? "block" : "none" }}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      <div className="dropside ">General</div>

      <ul className="ul-side">
        <Link
          to="/home"
          className={`ps-4 side ${
            selectedLink === "/home" ? "selected-link" : ""
          }`}
        >
          <HomeIcon className="m-2" size={24} />
          <span className="font-[poppins]">Home</span>
        </Link>
        <Link
          to="/order"
          className={`ps-4 side ${
            selectedLink === "/order" ||
            selectedLink === "/create" ||
            /^\/order\/[A-Za-z0-9]+$/.test(selectedLink)
              ? "selected-link"
              : ""
          }`}
        >
          <BookIcon className="m-2" size={24} />
          <span className="font-[poppins]">Orders</span>
        </Link>
        {role === "Admin" && (
          <Link
            to="/merchant"
            className={`ps-4 side ${
              selectedLink === "/merchant" ||
              /^\/merchant\/[A-Za-z0-9]+$/.test(selectedLink) ||
              selectedLink === "/merchant/payout"
                ? "selected-link"
                : ""
            }`}
          >
            <ShopIcon className="m-2" size={24} />
            <span className="font-[poppins]">Merchants</span>
          </Link>
        )}
        <Link
          to="/product"
          className={`ps-4 side ${
            selectedLink === "/product" ? "selected-link" : ""
          }`}
        >
          <ProductIcon className="m-2" size={24} />
          <span className="font-[poppins]">Products</span>
        </Link>
        <Link
          to="/customer"
          className={`ps-4 side ${
            selectedLink === "/customer" ||
            /^\/customer\/[A-Za-z0-9]+$/.test(selectedLink)
              ? "selected-link"
              : ""
          }`}
        >
          <UsersIcon className="m-2" size={24} />
          <span className="font-[poppins]">Customers</span>
        </Link>

        {role === "Admin" && (
          <>
            <Link
              to="/agent"
              className={`ps-4 side ${
                selectedLink === "/agent" ||
                /^\/agent\/[A-Za-z0-9]+$/.test(selectedLink)
                  ? "selected-link"
                  : ""
              }`}
            >
              <AgentIcon className="m-2" size={24} />
              <span className="font-[poppins]">Delivery Agents</span>
            </Link>

            <Link
              to="/delivery-management"
              className={`ps-4 side ${
                selectedLink === "/delivery-management" ? "selected-link" : ""
              }`}
            >
              <BikeIcon className="m-2" size={24} />
              <span className="font-[poppins]">Delivery Management</span>
            </Link>
          </>
        )}

        <Link
          to="/comm-and-subs"
          className={`ps-4 side ${
            selectedLink === "/comm-and-subs" ||
            selectedLink === "/subscription-log" ||
            selectedLink === "/commission-log"
              ? "selected-link"
              : ""
          }`}
        >
          <PercentageIcon className="m-2" size={24} />
          <span className="font-[poppins]">Commission/Subscription</span>
        </Link>
        {role === "Admin" && (
          <Link
            to="/chat"
            className={`ps-4 side ${
              selectedLink === "/chat" ? "selected-link" : ""
            }`}
          >
            <WhatsappIcon className="m-2" size={24} />
            <span className="font-[poppins]">Whatsapp</span>
          </Link>
        )}
      </ul>

      <div className="dropside" onClick={toggleSidebar("marketing")}>
        <span className="font-[poppins]">Marketing</span>
        <button>
          <AngleRightDropDownIcon size={24} />
        </button>
      </div>
      {openDropdown === "marketing" && (
        <ul className="ul-side">
          <Link
            to="/marketing/discount"
            className={`ps-4 side pt-1 pb-1 ${
              selectedLink === "/marketing/discount" ? "selected-link" : ""
            }`}
          >
            <GiftIcon className="me-2 ms-2 mb-1" size={24} />
            <span className="font-[poppins]">Discount</span>
          </Link>

          {role === "Admin" && (
            <>
              <Link
                to="/marketing/ad-banner"
                className={`ps-4 side ${
                  selectedLink === "/marketing/ad-banner" ? "selected-link" : ""
                }`}
              >
                <AdBannerIcon className="m-2" size={24} />
                <span className="font-[poppins]">Ad banner</span>
              </Link>

              <Link
                to="/marketing/loyalty-point"
                className={`ps-4 side ${
                  selectedLink === "/marketing/loyalty-point"
                    ? "selected-link"
                    : ""
                }`}
              >
                <LoyaltyPointIcon className="m-2" size={24} />
                <span className="font-[poppins]">Loyality Point</span>
              </Link>

              <Link
                to="/marketing/promo-code"
                className={`ps-4 side ${
                  selectedLink === "/marketing/promo-code"
                    ? "selected-link"
                    : ""
                }`}
              >
                <PromoCodeIcon className="m-2" size={24} />
                <span className="font-[poppins]">Promo code</span>
              </Link>

              <Link
                to="/marketing/referral"
                className={`ps-4 side ${
                  selectedLink === "/marketing/referral" ? "selected-link" : ""
                }`}
              >
                <AngleRightDropDownIcon className="m-2" size={24} />
                <span className="font-[poppins]">Referral</span>
              </Link>
            </>
          )}
        </ul>
      )}

      <div className="dropside" onClick={toggleSidebar("notification")}>
        <span className="font-[poppins]">Notification</span>
        <button>
          <AngleRightDropDownIcon size={24} />
        </button>
      </div>
      {openDropdown === "notification" && (
        <ul className="ul-side">
          <Link
            to="/notification/logs"
            className={`ps-4 side ${
              selectedLink === "/notification/logs" ? "selected-link" : ""
            }`}
          >
            <NotificationIcon className="m-2" size={24} />
            <span className="font-[poppins]">Notification log</span>
          </Link>

          {role === "Admin" && (
            <>
              <Link
                to="/notification/push-notification"
                className={`ps-4 side ${
                  selectedLink === "/notification/push-notification"
                    ? "selected-link"
                    : ""
                }`}
              >
                <PushNotificationIcon className="m-2" size={24} />
                <span className="font-[poppins]">Push Notification</span>
              </Link>

              <Link
                to="/notification/settings"
                className={`ps-4 side ${
                  selectedLink === "/notification/settings"
                    ? "selected-link"
                    : ""
                }`}
              >
                <NotificationSettingsIcon className="m-2" size={24} />
                <span className="font-[poppins]">Notification Settings</span>
              </Link>

              <Link
                to="/notification/alert-notification"
                className={`ps-4 side ${
                  selectedLink === "/notification/alert-notification"
                    ? "selected-link"
                    : ""
                }`}
              >
                <AlertNotificationIcon className="m-2" size={24} />
                <span className="font-[poppins]">Alert Notification</span>
              </Link>
            </>
          )}
        </ul>
      )}

      {role === "Admin" && (
        <>
          <div className="dropside" onClick={toggleSidebar("configure")}>
            <span className="font-[poppins]">Configure</span>
            <button>
              <AngleRightDropDownIcon size={24} />
            </button>
          </div>
          {openDropdown === "configure" && (
            <ul className="ul-side">
              <Link
                to="/configure/managers"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/configure/managers" ? "selected-link" : ""
                }`}
              >
                <ManagerIcon className="m-2" size={24} />
                <span className="font-[poppins]">Managers</span>
              </Link>

              <Link
                to="/configure/pricing"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/pricing" ? "selected-link" : ""
                }`}
              >
                <PricingIcon className="m-2" size={24} />
                <span className="font-[poppins]">Pricing</span>
              </Link>

              <Link
                to="/configure/tax"
                className={`ps-4 side ${
                  selectedLink === "/configure/tax" ? "selected-link" : ""
                }`}
              >
                <PercentageIcon className="m-2" size={24} />
                <span className="font-[poppins]">Tax</span>
              </Link>

              <Link
                to="/configure/geofence"
                className={`ps-4 side ${
                  selectedLink === "/configure/geofence" ? "selected-link" : ""
                }`}
              >
                <GeofenceIcon className="m-2" size={24} />
                <span className="font-[poppins]">Geofence</span>
              </Link>
            </ul>
          )}

          <div className="dropside" onClick={toggleSidebar("customize")}>
            <span className="font-[poppins]">App Customization</span>
            <button>
              <AngleRightDropDownIcon size={24} />
            </button>
          </div>
          {openDropdown === "customize" && (
            <ul className="ul-side">
              <Link
                to="/customize/customer-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/customize/customer-app"
                    ? "selected-link"
                    : ""
                }`}
              >
                <CustomizationIcon className="m-2" size={24} />
                <span className="font-[poppins]">Customer App</span>
              </Link>

              <Link
                to="/customize/agent-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/customize/agent-app" ? "selected-link" : ""
                }`}
              >
                <CustomizationIcon className="m-2" size={24} />
                <span className="font-[poppins]">Agent App</span>
              </Link>

              <Link
                to="/customize/merchant-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/customize/merchant-app"
                    ? "selected-link"
                    : ""
                }`}
              >
                <CustomizationIcon className="m-2" size={24} />
                <span className="font-[poppins]">Merchant App</span>
              </Link>
            </ul>
          )}
        </>
      )}

      <div className="dropside" onClick={toggleSidebar("account")}>
        <span className="font-[poppins]">Account</span>
        <button>
          <AngleRightDropDownIcon />
        </button>
      </div>
      {openDropdown === "account" && (
        <ul className="ul-side">
          {role === "Admin" && (
            <>
              <Link
                to="/account/activity-logs"
                className={`ps-4 side ${
                  selectedLink === "/account/activity-logs"
                    ? "selected-link"
                    : ""
                }`}
              >
                <ActivityIcon className="m-2" size={24} />
                <span className="font-[poppins]">Activity logs</span>
              </Link>

              <Link
                to="/account/account-logs"
                className={`ps-4 side ${
                  selectedLink === "/account/account-logs"
                    ? "selected-link"
                    : ""
                }`}
              >
                <AccountIcon className="m-2" size={24} />
                <span className="font-[poppins]">Account logs</span>
              </Link>
            </>
          )}

          <Link
            to="/account/settings"
            className={`ps-4 side ${
              selectedLink === "/account/settings" ? "selected-link" : ""
            }`}
          >
            <SettingsIcon className="m-2" size={24} />
            <span className="font-[poppins]">Settings</span>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default MainSideBar;
