export interface ICriteriaData {
  id: number;
  name: string;
  rank_order: number;
  weight: number;
  type: "benefit" | "cost";
  code: string;
}

export interface ICriteriaQueryParams {
  search?: string;
}

export interface ICriteriaPayload {
  id: number;
  skill: number;
  education: number;
  experience: number;
  age: number;
  leader: number;
}
export interface ICriteriaResponse {
  status: number;
  message: string;
  data: ICriteriaData[] | null;
}
export interface ICriteriaDatas {
  id?: number;
  code?: string;
  name?: string;
  weight?: number;
  type?: string;
  rank_order?: number;
}
