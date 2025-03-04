export interface ICriteriaData {
  id: number;
  name: string;
  point: number;
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
