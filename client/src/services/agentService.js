import axiosInstance from "../utils/axiosInstance";

export const addAgent = async (agentData) => {
  const response = await axiosInstance.post("/agents", agentData);
  return response.data;
};
