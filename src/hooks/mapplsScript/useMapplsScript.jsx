import { getAuthTokenForDeliveryManagementMap } from "@/hooks/deliveryManagement/useDeliveryManagement";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useMapplsScript = () => {
  const navigate = useNavigate();
  const { data: authToken } = useQuery({
    queryKey: ["get-auth-token"],
    queryFn: () => getAuthTokenForDeliveryManagementMap(navigate),
  });

  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk?layer=vector&v=3.0"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk?layer=vector&v=3.0`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    }

    const pluginScript = document.querySelector(
      `script[src="https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk_plugins?v=3.0&libraries=search"]`
    );

    if (!pluginScript) {
      const script = document.createElement("script");
      script.src = `https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk_plugins?v=3.0&libraries=search`;
      document.body.appendChild(script);
    }
  }, [authToken]);
};

export default useMapplsScript;
