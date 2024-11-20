import useApiClient from "../../api/apiClient";

export const getAllBusinessCategory = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(
      `/admin/business-categories/get-all-business-category`
    );

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching all business categories: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch all business category"
    );
  }
};
