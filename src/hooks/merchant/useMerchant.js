import useApiClient from "@/api/apiClient";

export const fetchMerchantsForDropDown = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/merchants/admin/all-merchant-drop-down`);

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch merchants."
    );
  }
};

export const fetchAllMerchants = async (filter, page, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/merchants/admin/fetch-merchant`, {
      params: {
        page,
        name: filter.name,
        serviceable: filter.status,
        businessCategory: filter.businessCategory,
        geofence: filter.geofence,
      },
    });

    return res.status === 200 ? res.data : null;
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch all merchants."
    );
  }
};

export const approveMerchant = async (merchantId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.patch(
      `/merchants/admin/approve-merchant/${merchantId}`,
      {}
    );

    return res.status === 200 ? res.data.message : null;
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to approve merchant."
    );
  }
};

export const rejectMerchant = async (merchantId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.patch(
      `/merchants/admin/reject-merchant/${merchantId}`,
      {}
    );

    return res.status === 200 ? res.data.message : null;
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to reject merchant."
    );
  }
};

export const createNewMerchant = async (data, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.post(`/merchants/admin/add-merchant`, data);

    return res.status === 201 ? res.data.message : null;
  } catch (err) {
    throw (
      err.response?.data?.errors || { message: "Failed to create merchant" }
    );
  }
};

export const fetchSingleMerchantDetail = async (role, merchantId, navigate) => {
  try {
    const route =
      role === "Admin"
        ? `/merchants/admin/${merchantId}`
        : `/merchants/profile`;

    const api = useApiClient(navigate);
    const res = await api.get(route);

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch merchant detail"
    );
  }
};

export const updateMerchantDetail = async (
  role,
  merchantId,
  data,
  navigate
) => {
  try {
    const route =
      role === "Admin"
        ? `/merchants/admin/update-merchant-details/${merchantId}`
        : `/merchants/update-merchant-details`;

    const api = useApiClient(navigate);
    const res = await api.put(route, data);

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to update merchant detail"
    );
  }
};

export const blockMerchant = async (merchantId, reason, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.put(`/merchants/admin/block-merchant/${merchantId}`, {
      reasonForBlocking: reason,
    });

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    console.error(err);
    throw new Error(err.response?.data?.message || "Failed to block merchant");
  }
};

export const deleteMerchant = async (merchantId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.delete(
      `/merchants/admin/delete-merchant/${merchantId}`
    );

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    console.error(err);
    throw new Error(err.response?.data?.message || "Failed to delete merchant");
  }
};

export const updateStatusMutation = async (merchantId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.patch(
      `/merchants/admin/change-status/${merchantId}`,
      {}
    );

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to update merchant status"
    );
  }
};

export const updateMerchant = async (role, merchantId, data, navigate) => {
  try {
    const route =
      role === "Admin"
        ? `/merchants/admin/edit-merchant/${merchantId}`
        : `/merchants/edit-profile`;

    const api = useApiClient(navigate);
    const res = await api.put(route, data);

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    throw (
      err.response?.data?.errors || { message: "Failed to update merchant" }
    );
  }
};
