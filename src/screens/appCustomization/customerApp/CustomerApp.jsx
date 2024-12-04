import GlobalSearch from "@/components/others/GlobalSearch";

import Service from "@/components/customerAppCustomization/Service";

const CustomerApp = () => {
  return (
    <div className="bg-gray-100 h-full">
      <GlobalSearch />

      <Service />
    </div>
  );
};

export default CustomerApp;
