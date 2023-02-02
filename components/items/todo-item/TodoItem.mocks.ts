import { ITodoItem } from './TodoItem';

const base: ITodoItem = {
  item: {
    _id: '1',
    name: 'Sample List',
    isComplete: true,
    listId: '1',
  },
  isEdit: false,
  onEdit: () => {},
  onDelete: () => {},
  onSave: () => {},
  onCancel: () => {},
};

export const mockTodoItemProps = {
  base,
};
