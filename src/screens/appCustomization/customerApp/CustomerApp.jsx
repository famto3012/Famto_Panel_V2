import GlobalSearch from "@/components/others/GlobalSearch";

import Service from "@/components/customerAppCustomization/Service";
import Toggles from "@/components/customerAppCustomization/Toggles";
import BusinessCategory from "@/components/customerAppCustomization/BusinessCategory";
import CustomOrderBanner from "@/components/customerAppCustomization/CustomOrderBanner";

const CustomerApp = () => {
  return (
    <div className="bg-gray-100 h-fit">
      <GlobalSearch />

      <Toggles />

      <Service />

      <BusinessCategory />

      <CustomOrderBanner />
    </div>
  );
};

export default CustomerApp;
