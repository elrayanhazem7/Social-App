import axios from "axios";
import { axiosInterceptor } from "../../axiosInterceptor/axiosInterceptor";
import type { ChangePasswordData } from "./changePassword.validation";
import type { ChangePasswordResponse } from "./changePassword.interface";



export async function changePassword(data: ChangePasswordData):Promise<ChangePasswordResponse> {
  try {
    const response = await axiosInterceptor.patch("/users/change-password", data);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError<{ message: string }>(err)) {
      throw new Error(err.response?.data?.message);
    }
    throw new Error("Network Error");
  }
}
