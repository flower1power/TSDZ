import axios from 'axios';
import {IUser} from './typeUser';
import {IDataSuccess, IResponseSuccess, Response} from './typeResponse';

const url: string = 'https://dummyjson.com/userss';

function isResponseSuccess(response: Response): response is IResponseSuccess {
  return response.status === 200;
}

function assertUsers(data: unknown): asserts data is IDataSuccess {
  if (data && typeof data === 'object' && 'users' in data) {
    return;
  } else {
    throw new Error('Это не Users');
  }
}

function getUsersData(response: Response): IUser[] {
  if (isResponseSuccess(response)) {
    assertUsers(response.data);
    return response.data.users;
  } else {
    throw new Error(response.data.statusText);
  }
}

async function requestDummy(url: string): Promise<IUser[]> {
  try {
    const response = await axios.get(url);
    return getUsersData(response);
  } catch (error) {
    throw new Error(`Ошибка: ${error}`);
  }
}

requestDummy(url)
  .then(res => console.log(res))
  .catch(err => console.log(err));





