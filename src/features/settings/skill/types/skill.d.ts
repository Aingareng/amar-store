export interface ISkillTableData {
  id: number;
  name: string;
  weight: number;
}

export interface ISkillQueryParams {
  id?: string;
  search?: string;
}

export interface ISkillPayload {
  name: string;
  weight: number;
}
