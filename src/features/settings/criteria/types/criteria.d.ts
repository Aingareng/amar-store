export interface ICriteriaData {
  id?: number;
  name?: string;
  rank_order?: number;
  weight?: number;
  type?: "benefit" | "cost";
  code?: string;
}

export interface ICriteriaQueryParams {
  id?: number;
  search?: string;
}

export interface ICriteriaPayload {
  id?: number;
  name: string;
  rank_order: number;
  // weight: number;
  type: "benefit" | "cost";
  code: string;
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
