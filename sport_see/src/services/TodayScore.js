import AxiosClient from "./axios-config";

export const getTodayScoreService = async (userId) => {
  try {
    const response = await AxiosClient.get(`/user/${userId}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}