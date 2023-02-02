export interface IItem {
  _id: string;
  name: string;
  isComplete: boolean;
}

export interface ICreateItemParams {
  listId: string;
  name: string;
}

export interface IEditItemParams {
  _id: string;
  name: string;
  isComplete: boolean;
  listId: string;
}

export interface IDeleteItemParams {
  _id: string;
  listId: string;
}

export interface IContext {
  previousItems: IItem[] | undefined;
}
