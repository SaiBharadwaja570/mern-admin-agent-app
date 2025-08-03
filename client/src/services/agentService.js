import  axiosInstance  from "../utils/axiosInstance";


// Adds a new agent by sending agent data to the server.
 
export const addAgent = async (agentData) => {
  const response = await axiosInstance.post("/agents", agentData);
  return response.data;
};

