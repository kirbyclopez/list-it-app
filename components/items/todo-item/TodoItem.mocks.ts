import { ITodoItem } from './TodoItem';

const base: ITodoItem = {
  _id: '1',
  name: 'Sample List',
  isComplete: true,
  isEdit: false,
  onEdit: () => {},
  onDelete: () => {},
  onSave: () => {},
  onCancel: () => {},
};

export const mockTodoItemProps = {
  base,
};
