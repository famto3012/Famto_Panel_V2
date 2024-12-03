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
    if (!authToken) return; // Wait for the token to be fetched

    const mapScriptURL = `https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk?layer=vector&v=3.0`;
    const pluginScriptURL = `https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk_plugins?v=3.0&libraries=search`;

    // Helper function to load a script if it doesn't already exist
    const loadScript = (url) => {
      if (document.querySelector(`script[src="${url}"]`)) {
        return; // Skip if the script already exists
      }
      const script = document.createElement("script");
      script.src = url;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript(mapScriptURL);
    loadScript(pluginScriptURL);
  }, [authToken]);
};

export default useMapplsScript;
