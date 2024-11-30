import useApiClient from "@/api/apiClient";

export const fetchAllProductsOfMerchant = async (merchantId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(
      `/products/all-products-of-merchant/${merchantId}`
    );

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching all products of merchant: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch all products of merchant."
    );
  }
};
