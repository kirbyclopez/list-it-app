import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { IList, IMessageResponse } from '../interfaces/list.interface';

export const fetchLists = async () => {
  const res = await instance.get('/api/lists', {
    withCredentials: true,
  });

  return res.data;
};

export const fetchList = async (_id: string): Promise<IList> => {
  const res = await instance.get(`/api/lists/${_id}`, {
    withCredentials: true,
  });

  return res.data;
};

export const createList = async (name: string): Promise<IList> => {
  const data = { name };
  const res: AxiosResponse = await instance.post('/api/lists', data, {
    withCredentials: true,
  });

  return res.data;
};

export const editList = async (_id: string, name: string): Promise<IList> => {
  const data = { name };
  const res: AxiosResponse = await instance.put(`/api/lists/${_id}`, data, {
    withCredentials: true,
  });

  return res.data;
};

export const deleteList = async (_id: string): Promise<IMessageResponse> => {
  const res: AxiosResponse = await instance.delete(`/api/lists/${_id}`, {
    withCredentials: true,
  });

  return res.data;
};
