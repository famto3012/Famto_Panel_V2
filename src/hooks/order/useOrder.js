import useApiClient from "../../api/apiClient";

export const fetchAllOrders = async (filter, navigate) => {
  try {
    const api = useApiClient(navigate);

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

export const searchCustomerForOrder = async (role, query, navigate) => {
  try {
    const api = useApiClient(navigate);

    const route =
      role === "Admin"
        ? `/admin/customers/search-for-order?query=${query}`
        : `/admin/customers/search-customer-of-merchant-for-order?query=${query}`;

    const res = await api.get(route);

    return res.status === 200 ? res.data : [];
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to search customers for ordering."
    );
  }
};

export const searchMerchantForOrder = async (query, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/merchants/admin/search?query=${query}`);

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to search merchants for ordering."
    );
  }
};

export const searchProductToOrder = async (
  merchantId,
  categoryId,
  query,
  navigate
) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(
      `/customers/search-products/${merchantId}/${categoryId}?query=${query}`
    );

    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to search products for ordering."
    );
  }
};

export const createInvoice = async (role, data, navigate) => {
  try {
    const route =
      role === "Admin"
        ? `/orders/admin/create-order-invoice`
        : `/orders/create-order-invoice`;

    console.log(data);

    const api = useApiClient(navigate);
    const res = await api.post(route, data);

    return res.status === 200 ? res.data.data : {};
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create invoice.");
  }
};

export const createOrder = async (role, data, navigate) => {
  try {
    const route =
      role === "Admin" ? `/orders/admin/create-order` : `/orders/create-order`;

    const api = useApiClient(navigate);
    const res = await api.post(route, data);

    return res.status === 201 ? res.data.message : null;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to create order.");
  }
};

export const fetchMapplsAuthToken = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/token/get-auth-token`);

    return res.status === 200 ? res.data.data : null;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch mappls token"
    );
  }
};
