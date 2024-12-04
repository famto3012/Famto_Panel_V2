import GlobalSearch from "@/components/others/GlobalSearch";

import Service from "@/components/customerAppCustomization/Service";
import Toggles from "@/components/customerAppCustomization/Toggles";

const CustomerApp = () => {
  return (
    <div className="bg-gray-100 h-fit">
      <GlobalSearch />

      <Toggles />

      <Service />
    </div>
  );
};

export default CustomerApp;
