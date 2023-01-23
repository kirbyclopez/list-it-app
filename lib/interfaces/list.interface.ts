import { ITodoListItem } from '../../components/lists/todo-list-item/TodoListItem';

export interface ICreateListParams {
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
