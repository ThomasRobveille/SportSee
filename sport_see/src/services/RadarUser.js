import AxiosClient from "./axios-config";

export const getRadarUserService = async (userId) => {
  try {
    const response = await AxiosClient.get(`/user/${userId}/performance`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}