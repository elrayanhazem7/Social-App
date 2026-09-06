import axios from "axios";
import type { RegisterDataForm } from "./register.validation";
import type { RegisterResponse } from "./register.interface";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";

export async function sendUserRegister(userData: RegisterDataForm) {
  try {
    const response = await axiosInterceptor.post<RegisterResponse>(
      `/users/signup`,
      userData,
    );
    // console.log(response.data.message);
    return response.data.message; //"string "
  } catch (err: any) {
    if (axios.isAxiosError<{ message: string }>(err)) {
      throw new Error(err.response?.data?.message);
    }
    throw new Error("Network Error");
  }
}
