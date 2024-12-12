import useApiClient from "../../api/apiClient";

export const fetchAllOrders = async (filter, navigate) => {
  try {
    const api = useApiClient(navigate);

    console.log(filter.date);

    const route =
      filter.selectedOption === "order"
        ? `/orders/admin/get-orders`
        : `/orders/admin/get-scheduled-orders`;

    const res = await api.get(route, {
      params: {
        status: filter.status,
        paymentMode: filter.paymentMode,
        deliveryMode: filter.deliveryMode,
        startDate: filter.date[0]
          ? filter.date[0].toLocaleDateString("en-CA")
          : null,
        endDate: filter.date[1]
          ? filter.date[1].toLocaleDateString("en-CA")
          : null,
        merchantId: filter.selectedMerchant,
        orderId: filter.orderId,
      },
    });

    return res.status === 200 ? res.data : [];
  } catch (err) {
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
