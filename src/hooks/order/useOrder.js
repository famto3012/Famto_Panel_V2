import useApiClient from "../../api/apiClient";

// To find
export const fetchAllOrders = async (
  selectedOption,
  status,
  paymentMode,
  deliveryMode,
  selectedMerchant,
  startDate,
  endDate,
  navigate
) => {
  try {
    const api = useApiClient(navigate);

    const route =
      selectedOption === "order"
        ? `/orders/admin/filter`
        : `/orders/admin/filter-scheduled`;

    const formattedStartDate = startDate
      ? startDate.toLocaleDateString("en-CA")
      : "";
    const formattedEndDate = endDate ? endDate.toLocaleDateString("en-CA") : "";

    const res = await api.get(route, {
      params: {
        status,
        paymentMode,
        deliveryMode,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        merchantId: selectedMerchant,
      },
    });

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching orders: ${err}`);
    throw new Error(err.response?.data?.message || "Failed to fetch orders.");
  }
};

// To search by Id
export const searchOrder = async (search, selectedOption, navigate) => {
  try {
    const api = useApiClient(navigate);

    const route =
      selectedOption === "order"
        ? `/orders/admin/search-order?query=${search}`
        : `/orders/admin/search-scheduled-order?query=${search}`;

    const res = await api.get(route);

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(err);
    throw new Error(err.response?.data?.message || "Failed to search orders.");
  }
};

// To accept order
export const acceptOrder = async (orderId, role, navigate) => {
  try {
    const route =
      role === "Admin"
        ? `/orders/admin/confirm-order/${orderId}`
        : `/orders/confirm-order/${orderId}`;

    const api = useApiClient(navigate);
    const res = await api.patch(route, {});

    return res.status === 200 ? res.data : [];
  } catch (err) {
    console.error(`Error in accepting order: ${err}`);
    throw new Error(err.response?.data?.message || "Failed to accept order.");
  }
};

// To reject order
export const rejectOrder = async (orderId, role, navigate) => {
  try {
    const route =
      role === "Admin"
        ? `/orders/admin/reject-order/${orderId}`
        : `/orders/reject-order/${orderId}`;

    const api = useApiClient(navigate);
    const res = await api.put(route, {});

    return res.status === 200 ? res.data : [];
  } catch (err) {
    console.error(`Error in rejecting order: ${err}`);
    throw new Error(err.response?.data?.message || "Failed to reject order.");
  }
};

// To get single order detail
export const getOrderDetail = async (orderId, role, navigate) => {
  try {
    const route =
      role === "Admin" ? `/orders/admin/${orderId}` : `/orders/${orderId}`;

    const api = useApiClient(navigate);
    const res = await api.get(route);

    return res.status === 200 ? res.data.data : {};
  } catch (err) {
    console.error("Error in getOrderDetail:", err?.response?.data || err);
    throw new Error(
      err?.response?.data?.message || "Failed to fetch order detail."
    );
  }
};
