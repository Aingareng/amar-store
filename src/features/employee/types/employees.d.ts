export interface IEmployeeQueryParams {
  limit?: string;
  search?: string;
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
}
