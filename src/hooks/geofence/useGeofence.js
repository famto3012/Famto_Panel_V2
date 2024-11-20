import useApiClient from "../../api/apiClient";

export const getAllGeofence = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/geofence/get-geofence`);

    return res.status === 200 ? res.data.geofences : [];
  } catch (err) {
    console.error(`Error in fetching all geofence: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch all geofence"
    );
  }
};
