import { ComponentPropsWithoutRef, useState } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';
import {
  IDeleteListParams,
  IEditListParams,
  IMessageResponse,
} from '../../../lib/interfaces/list.interface';
import {
  useDeleteList,
  useEditList,
} from '../../../lib/mutations/list.mutation';
import TodoListItem, { ITodoListItem } from '../todo-list-item/TodoListItem';

export interface ITodoLists extends ComponentPropsWithoutRef<'div'> {
  lists: ITodoListItem[];
  isLoading: boolean;
  isError: boolean;
  error: string;
}

const TodoLists: React.FC<ITodoLists> = ({
  lists,
  isLoading,
  isError,
  error,
  ...divProps
}) => {
  const [editListId, setEditListId] = useState<string>('');
  const queryClient = useQueryClient();

  const editMutation: UseMutationResult<ITodoListItem, Error, IEditListParams> =
    useEditList(queryClient);

  const deleteMutation: UseMutationResult<
    IMessageResponse,
    Error,
    IDeleteListParams
  > = useDeleteList(queryClient);

  const handleSave = (name: string) => {
    editMutation.mutate({ _id: editListId, name });
    setEditListId('');
  };

  if (isLoading)
    return (
      <div {...divProps} className="my-5">
        <p className="text-center text-slate-400">Getting lists...</p>
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
      {lists.length > 0 &&
        lists.map((list, idx) => (
          <TodoListItem
            key={idx}
            _id={list._id}
            name={list.name}
            isEdit={editListId === list._id}
            onEdit={() => setEditListId(list._id)}
            onCancel={() => setEditListId('')}
            onDelete={() => deleteMutation.mutate({ _id: list._id })}
            onSave={handleSave}
          />
        ))}
      {lists.length === 0 && (
        <p className="text-center text-slate-400">
          No lists to show. Create one now.
        </p>
      )}
    </div>
  );
};

export default TodoLists;
