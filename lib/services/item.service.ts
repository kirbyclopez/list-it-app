import { AxiosResponse } from 'axios';
import { instance } from '../axios';
import { IItem } from '../interfaces/item.interface';
import { IMessageResponse } from '../interfaces/list.interface';

export const fetchItems = async (listId: string) => {
  const res = await instance.get(`/api/lists/${listId}/items`, {
    withCredentials: true,
  });

  return res.data;
};

export const fetchItem = async (_id: string): Promise<IItem> => {
  const res = await instance.get(`/api/items/${_id}`, {
    withCredentials: true,
  });

  return res.data;
};

export const createItem = async (
  listId: string,
  name: string
): Promise<IItem> => {
  const data = { listId, name };
  const res: AxiosResponse = await instance.post('/api/items', data, {
    withCredentials: true,
  });

  return res.data;
};

export const editItem = async (
  _id: string,
  name: string,
  isComplete: boolean
): Promise<IItem> => {
  const data = { name, isComplete };
  const res: AxiosResponse = await instance.patch(`/api/items/${_id}`, data, {
    withCredentials: true,
  });

  return res.data;
};

export const deleteItem = async (_id: string): Promise<IMessageResponse> => {
  const res: AxiosResponse = await instance.delete(`/api/items/${_id}`, {
    withCredentials: true,
  });

  return res.data;
};
