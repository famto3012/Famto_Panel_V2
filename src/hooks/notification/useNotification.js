import useApiClient from "@/api/apiClient";

export const getNotificationLog = async ({ role, page, limit, navigate }) => {
  try {
    const api = useApiClient(navigate);

    const route =
      role === "Admin"
        ? "/admin/notification/get-admin-notification-log"
        : "/admin/notification/get-merchant-notification-log";
    const res = await api.get(route, {
      params: {
        page,
        limit,
      },
    });
    return res.status === 200 ? res.data : [];
  } catch (err) {
    console.error(`Error in fetching notification log: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch notification log."
    );
  }
};
