export interface ILeadershipTableData {
  id: number;
  name: string;
  weight: number;
}

export interface ILeadershipQueryParams {
  id?: string;
  search?: string;
}

export interface ILeadershipPayload {
  name: string;
  weight: number;
}
