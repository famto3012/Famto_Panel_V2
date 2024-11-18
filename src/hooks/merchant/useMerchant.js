import useApiClient from "../../api/apiClient";

export const fetchMerchantsForDropDown = async (navigate) => {
  try {
    const api = useApiClient(navigate);

    const res = await api.get(`/merchants/admin/all-merchant-drop-down`);
    // console.log(res.data.data);

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(err);
    throw new Error(
      err.response?.data?.message || "Failed to fetch merchants."
    );
  }
};
