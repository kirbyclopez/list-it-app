import { ITodoListItem } from './TodoListItem';

const base: ITodoListItem = {
  _id: '1',
  name: 'Sample List',
  isEdit: false,
  onEdit: () => {},
  onDelete: () => {},
  onSave: () => {},
  onCancel: () => {},
};

export const mockTodoListItemProps = {
  base,
};
