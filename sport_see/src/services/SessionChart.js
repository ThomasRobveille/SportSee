import AxiosClient from "./axios-config";

export const getSessionChartService = async (userId) => {
  try {
    const response = await AxiosClient.get(`/user/${userId}/average-sessions`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}