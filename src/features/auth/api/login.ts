import { api } from "../../../shared/utils/api";

export type payloadType = {
  email: string;
  password: string;
};
export interface ILoginResponse {
  status: number;
  message: string;
  data: null;
}

async function Login(payload: payloadType) {
  try {
    const response = await api.post<ILoginResponse>("/login", payload);
    console.log("🚀 ~ Login ~ response:", response);

    if (response.status === 400 || response.status === 500) {
      return;
    }

    return response;
  } catch (error) {
    return error;
  }
}

export default Login;
