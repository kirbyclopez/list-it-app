import { ITodoLists } from './TodoLists';

const base: ITodoLists = {
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
  isLoading: false,
  isError: false,
  error: '',
};

export const mockTodoListsProps = {
  base,
};
