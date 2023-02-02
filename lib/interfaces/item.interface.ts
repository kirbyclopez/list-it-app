export interface IItem {
  _id: string;
  name: string;
  isComplete: boolean;
}

export interface ICreateItemParams {
  name: string;
}

export interface IEditItemParams {
  _id: string;
  name: string;
  isComplete: boolean;
}

export interface IDeleteItemParams {
  _id: string;
}

export interface IContext {
  previousItems: IItem[] | undefined;
}
