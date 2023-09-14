import AxiosClient from "./axios-config";

export const getDailyActivityService = async (userId) => {
  try {
    const response = await AxiosClient.get(`/user/${userId}/activity`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}