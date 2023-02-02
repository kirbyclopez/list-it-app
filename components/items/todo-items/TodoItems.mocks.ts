import { ITodoItems } from './TodoItems';

const base: ITodoItems = {
  items: [
    {
      _id: '1',
      name: 'Sample List 1',
      isComplete: false,
      listId: '1',
    },
    {
      _id: '2',
      name: 'Sample List 2',
      isComplete: false,
      listId: '1',
    },
  ],
  isLoading: false,
  isError: false,
  error: '',
};

export const mockTodoItemsProps = {
  base,
};
