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
  age: Date;
  education: string;
  experience: Date;
  leadership: string;
  createdAt: Date;
  updatedAt: Date;
  final_score: number;
  rangking: number;
  position: string;
  skill: string;
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
  age: string;
  gender: "male" | "female";
  education: string;
  experience: string;
  leadership: string;
  position: string;
  skill: string;
}
