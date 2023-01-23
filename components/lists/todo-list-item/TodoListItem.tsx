import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';
import {
  IDeleteListParams,
  IMessageResponse,
} from '../../../lib/interfaces/list.interface';
import { useDeleteList } from '../../../lib/mutations/list.mutation';
import InputBox from '../../forms/input-box/InputBox';

export interface ITodoListItem extends ComponentPropsWithoutRef<'div'> {
  _id: string;
  name: string;
  isEdit: boolean;
  onEdit?: () => void;
  _onDelete?: () => void;
  _onSave?: () => void;
  onCancel?: () => void;
}

const TodoListItem: React.FC<ITodoListItem> = ({
  _id,
  name,
  isEdit,
  onEdit,
  _onDelete,
  _onSave,
  onCancel,
  ...divProps
}) => {
  const [text, setText] = useState<string>(name);
  const queryClient = useQueryClient();

  useEffect(() => {
    setText(name);
  }, [name, isEdit]);

  const mutation: UseMutationResult<
    IMessageResponse,
    Error,
    IDeleteListParams
  > = useDeleteList(queryClient);

  return (
    <div
      {...divProps}
      className={`flex items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent space-x-6 hover:bg-slate-50 ${
        isEdit ? 'border-l-green-600' : ''
      }`}
    >
      <div className="inline-flex flex-1">
        {!isEdit && (
          <label className="text-gray-700 border-b-transparent hover:cursor-pointer">
            {name}
          </label>
        )}
        {isEdit && (
          <InputBox
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            className="px-0 py-0 border-0 text-base rounded-none bg-transparent focus:ring-blue-500"
          />
        )}
      </div>
      <div className="inline-flex space-x-4">
        {!isEdit && (
          <>
            <button title="Edit" onClick={onEdit}>
              <i className="fa-solid fa-pencil text-slate-500 hover:text-green-600"></i>
            </button>
            <button title="Delete" onClick={() => mutation.mutate({ _id })}>
              <i className="fa-solid fa-trash-can text-slate-500 hover:text-red-500"></i>
            </button>
          </>
        )}
        {isEdit && (
          <>
            <button title="Save">
              <i className="fa-solid fa-check text-slate-500 hover:text-green-600"></i>
            </button>
            <button title="Cancel" onClick={onCancel}>
              <i className="fa-solid fa-xmark text-slate-500 hover:text-red-500"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoListItem;
