import { ITodoListCrud } from './TodoListCrud';

const base: ITodoListCrud = {
  lists: [
    {
      _id: '1',
      name: 'Sample List 1',
      isEdit: false,
    },
    {
      _id: '2',
      name: 'Sample List 2',
      isEdit: false,
    },
  ],
};

export const mockTodoListCrudProps = {
  base,
};
