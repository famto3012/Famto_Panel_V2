import useApiClient from "../../api/apiClient";

export const fetchAllAgentPricing = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/agent-pricing/get-all-agent-pricing`);

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching all agent pricing: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch all agent pricing."
    );
  }
};

export const updateAgentPricingStatus = async (pricingId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.post(
      `/admin/agent-pricing/change-status/${pricingId}`,
      {}
    );

    return res.status === 200 ? res.data.message : [];
  } catch (err) {
    console.error(`Error in updating agent pricing status: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to update agent pricing status."
    );
  }
};

export const createNewAgentPricing = async (pricingData, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.post(
      `/admin/agent-pricing/add-agent-pricing`,
      pricingData
    );

    return res.status === 201 ? res.data.message : null;
  } catch (err) {
    console.error(`Error in updating agent pricing status: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to update agent pricing status."
    );
  }
};

export const getSingleAgentPricing = async (pricingId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/agent-pricing/${pricingId}`);

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    console.error(`Error in getting agent pricing: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch agent pricing detail."
    );
  }
};

export const editAgentPricing = async (pricingId, pricingData, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.put(
      `/admin/agent-pricing/edit-agent-pricing/${pricingId}`,
      pricingData
    );

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    console.error(`Error in getting agent pricing: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch agent pricing detail."
    );
  }
};

export const deleteAgentPricing = async (pricingId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.delete(
      `/admin/agent-pricing/delete-agent-pricing/${pricingId}`
    );

    return res.status === 200 ? res.data.message : null;
  } catch (err) {
    console.error(`Error in deleting agent pricing: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to delete agent pricing."
    );
  }
};
