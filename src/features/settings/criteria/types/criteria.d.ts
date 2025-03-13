export interface ICriteriaData {
  id: number;
  name: string;
  rank_order: number;
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
  data: ICriteriaData[];
}
export interface ICriteriaDatas {
  id?: number;
  criteria_code?: string;
  criteria_name?: string;
  criteria_bobot?: number;
  criteria_type?: string;
  criteria_priority?: number;
}
