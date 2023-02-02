import { ITodoLists } from './TodoLists';

const base: ITodoLists = {
  lists: [
    {
      _id: '1',
      name: 'Sample List 1',
    },
    {
      _id: '2',
      name: 'Sample List 2',
    },
  ],
  isLoading: false,
  isError: false,
  error: '',
};

export const mockTodoListsProps = {
  base,
};
