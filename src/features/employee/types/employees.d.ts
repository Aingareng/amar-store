export interface IEmployeeQueryParams {
  limit?: string;
  search?: string;
  id?: string;
}
export interface IEmployeesResponse {
  status: number;
  message: string;
  data: Employees[];
}

export interface Employees {
  id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  isMale: boolean;
  k3: Date;
  k2: string;
  k4: Date;
  k5: string;
  createdAt: Date;
  updatedAt: Date;
  final_score: number;
  rangking: number;
  position: string;
  k1: string;
  score?: number;
}

export interface EmployeeDetail {
  username: string;
  email: string;
  password: string;
  phone: string;
  isMale: boolean;
  age: Date;
  education: string;
  experience: Date;
  leadership: string;
  position: string;
}

export interface IEmployeePayload {
  username?: string;
  email: string;
  password: string;
  phone: string;
  // isMale: boolean;
  k3: string;
  gender: "male" | "female";
  k2: string;
  k4: string;
  k5: string;
  position: string;
  k1: string;
}
