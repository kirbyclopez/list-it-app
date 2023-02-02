import { ComponentPropsWithoutRef, useState } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';
import {
  IDeleteItemParams,
  IEditItemParams,
  IItem,
} from '../../../lib/interfaces/item.interface';
import { IMessageResponse } from '../../../lib/interfaces/list.interface';
import {
  useDeleteItem,
  useEditItem,
} from '../../../lib/mutations/item.mutation';
import TodoItem from '../todo-item/TodoItem';

export interface ITodoItems extends ComponentPropsWithoutRef<'div'> {
  items: IItem[];
  isLoading: boolean;
  isError: boolean;
  error: string;
}

const TodoItems: React.FC<ITodoItems> = ({
  items,
  isLoading,
  isError,
  error,
  ...divProps
}) => {
  const [editItemId, setEditItemId] = useState<string>('');
  const queryClient = useQueryClient();

  const editMutation: UseMutationResult<IItem, Error, IEditItemParams> =
    useEditItem(queryClient);

  const deleteMutation: UseMutationResult<
    IMessageResponse,
    Error,
    IDeleteItemParams
  > = useDeleteItem(queryClient);

  const handleSave = (
    listId: string,
    _id: string,
    name: string,
    isComplete: boolean
  ) => {
    editMutation.mutate({ listId, _id, name, isComplete });
    setEditItemId('');
  };

  if (isLoading)
    return (
      <div {...divProps} className="my-5">
        <p className="text-center text-slate-400">Getting items...</p>
      </div>
    );

  if (isError)
    return (
      <div {...divProps} className="my-5">
        <p className="text-center text-slate-400">Error: {error}</p>
      </div>
    );

  return (
    <div {...divProps} className="my-5">
      {items.length > 0 &&
        items.map((item, idx) => (
          <TodoItem
            key={idx}
            item={item}
            isEdit={editItemId === item._id}
            onEdit={() => setEditItemId(item._id)}
            onCancel={() => setEditItemId('')}
            onDelete={() =>
              deleteMutation.mutate({ listId: item.listId, _id: item._id })
            }
            onSave={handleSave}
          />
        ))}
      {items.length === 0 && (
        <p className="text-center text-slate-400">
          No items to show. Create one now.
        </p>
      )}
    </div>
  );
};

export default TodoItems;
