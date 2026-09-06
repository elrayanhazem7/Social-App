import axios from "axios";
import type { Data, LoginResponse, User } from "./login.interface";
import type { LoginDataForm } from "./login.validation";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";

export async function sendUserLogin(
  userData: LoginDataForm,
): Promise<LoginResponse> {
  try {
    const response = await axiosInterceptor.post<LoginResponse>(
      "/users/signin",
      userData,
    );
    return response.data; //"string "
  } catch (err) {
    if (axios.isAxiosError<{ message: string }>(err)) {
      throw new Error(err.response?.data?.message);
    }
    throw new Error("Network Error");
  }
}

export async function getUserData(): Promise<User> {
  try {
    const response = await axiosInterceptor.get<Data>(`/users/profile-data`);
    return response?.data.data.user;
  } catch (error) {
    if (axios.isAxiosError<{ message: string }>(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Network Error");
  }
}
