import { IUser } from './typeUser.js';

interface IDataFailed {
  status: number;
  statusText: string;
}

export interface IDataSuccess {
  users: IUser[];
}

export interface IResponseSuccess {
  status: number;
  data: IDataSuccess;
}

export interface IResponseFailed {
  status: number;
  data: IDataFailed;
}

export type Response = IResponseSuccess | IResponseFailed;
