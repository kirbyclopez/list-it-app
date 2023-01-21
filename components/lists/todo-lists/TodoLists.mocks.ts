import { ITodoLists } from './TodoLists';

const base: ITodoLists = {
  lists: [
    {
      id: '1',
      name: 'Sample List 1',
    },
    {
      id: '2',
      name: 'Sample List 2',
    },
  ],
};

export const mockTodoListsProps = {
  base,
};
