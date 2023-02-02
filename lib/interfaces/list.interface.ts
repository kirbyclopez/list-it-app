import { ITodoListItem } from '../../components/lists/todo-list-item/TodoListItem';

export interface IList {
  _id: string;
  name: string;
}

export interface ICreateListParams {
  name: string;
}

export interface IEditListParams {
  _id: string;
  name: string;
}

export interface IDeleteListParams {
  _id: string;
}

export interface IMessageResponse {
  message: string;
}

export interface IContext {
  previousLists: ITodoListItem[] | undefined;
}
