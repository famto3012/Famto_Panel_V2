import useApiClient from "../../api/apiClient";

export const getAutoAllocation = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/auto-allocation/get`);

    return res.status === 200 ? res.data.data : {};
  } catch (err) {
    console.error(`Error in fetching auto allocation: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch auto allocation"
    );
  }
};

export const addAutoAllocation = async (data, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.post(`/admin/auto-allocation/add`, data);

    return res.status === 201 ? res.data.message : [];
  } catch (err) {
    console.error(`Error in adding auto allocation: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to add auto allocation"
    );
  }
};

export const getTaskById = async (taskId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/delivery-management/task/${taskId}`);

    return res.status === 201 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching task by id: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch task by id"
    );
  }
};

export const getAgentsAccordingToGeofence = async (taskId, data, navigate) => {
  try {
    console.log("Here", taskId, data);
    const api = useApiClient(navigate);
    const res = await api.post(
      `/admin/delivery-management/agents-in-geofence/${taskId}`,
      data
    );
    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching agents according to geofence: ${err}`);
    throw new Error(
      err.response?.data?.message ||
        "Failed to fetch agents according to geofence"
    );
  }
};

export const getTaskAccordingToFilter = async (filter, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/delivery-management/task`, {
      params: {
        filter,
      },
    });
    return res.status === 201 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching task according to filter: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch task according to filter"
    );
  }
};

export const searchTaskAccordingToOrderId = async (orderId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.post(`/admin/delivery-management/get-order-id`, {
      orderId,
    });
    return res.status === 200 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching task according to order id: ${err}`);
    throw new Error(
      err.response?.data?.message ||
        "Failed to fetch task according to order id"
    );
  }
};

export const getAllAgents = async (selectedStatus, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/delivery-management/agent`, {
      params: {
        filter: selectedStatus,
      },
    });
    return res.status === 201 ? res.data.data : [];
  } catch (err) {
    console.error(`Error in fetching all agents: ${err}`);
    throw new Error(
      err.response?.data?.message || "Failed to fetch all agents"
    );
  }
};

export const getAgentMyName = async (agentName, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/delivery-management/agent-name`, {
      params: {
        fullName: agentName,
      },
    });
    return res.status === 200 ? res.data : [];
  } catch (err) {
    console.error(`Error in fetching agent: ${err}`);
    throw new Error(
      err.response?.data?.message ||
        `Failed to fetch agent by name ${agentName}`
    );
  }
};

export const getTaskByDateRange = async (startDate, endDate, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/delivery-management/task-date`, {
      params: {
        startDate,
        endDate,
      },
    });
    return res.status === 200 ? res.data : [];
  } catch (err) {
    console.error(`Error in fetching task: ${err}`);
    throw new Error(err.response?.data?.message || `Failed to fetching task`);
  }
};

export const getAuthTokenForDeliveryManagementMap = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/token/get-auth-token`);
    return res.status === 200 ? res.data.data : {};
  } catch (err) {
    console.error(`Error in fetching token: ${err}`);
    throw new Error(err.response?.data?.message || `Failed to fetching token`);
  }
};

export const updateAutoALlocationStatus = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.put(`/admin/auto-allocation/update-status`, {});
    return res.status === 201 ? res.data : {};
  } catch (err) {
    console.error(`Error in updating auto allocation status: ${err}`);
    throw new Error(
      err.response?.data?.message || `Failed to update auto allocation status`
    );
  }
};

export const getAgentsForMap = async (navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.get(`/admin/agents/all-agents`);
    return res.status === 200 ? res.data.data : {};
  } catch (err) {
    console.error(`Error in getting all agents for map: ${err}`);
    throw new Error(
      err.response?.data?.message || `Failed to get all agents for map`
    );
  }
};

export const assignAgentToTask = async (agentId, taskId, navigate) => {
  try {
    const api = useApiClient(navigate);
    const res = await api.post(
      `/admin/delivery-management/assign-task/${taskId}`,
      {
        agentId,
      }
    );
    return res.status === 200 ? res.data : {};
  } catch (err) {
    console.error(`Error in assigning agent to task: ${err}`);
    throw new Error(
      err.response?.data?.message || `Failed to assign agent to task`
    );
  }
};