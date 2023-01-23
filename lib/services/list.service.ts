import { AxiosResponse } from 'axios';
import { ITodoListItem } from '../../components/lists/todo-list-item/TodoListItem';
import { instance } from '../axios';
import { IMessageResponse } from '../interfaces/list.interface';

export const createList = async (name: string): Promise<ITodoListItem> => {
  const data = { name };
  const res: AxiosResponse = await instance.post('/api/lists', data, {
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
