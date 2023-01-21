import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import InputBox from '../../forms/input-box/InputBox';

export interface ITodoListItem extends ComponentPropsWithoutRef<'div'> {
  _id: string;
  name: string;
  isEdit: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const TodoListItem: React.FC<ITodoListItem> = ({
  _id,
  name,
  isEdit,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  ...divProps
}) => {
  const [text, setText] = useState<string>(name);

  useEffect(() => {
    setText(name);
  }, [isEdit]);

  return (
    <div
      {...divProps}
      className="flex items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent space-x-6"
    >
      <div className="inline-flex flex-1">
        {!isEdit && (
          <label className="text-gray-700 border-b border-b-transparent">
            {name}
          </label>
        )}
        {isEdit && (
          <InputBox
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            className="px-0 py-0 border-0 border-b text-base rounded-none border-b-slate-300 focus:ring-blue-500"
          />
        )}
      </div>
      <div className="inline-flex space-x-4">
        {!isEdit && (
          <>
            <button title="Edit" onClick={onEdit}>
              <i className="fa-solid fa-pencil text-slate-500 hover:text-green-600"></i>
            </button>
            <button title="Delete">
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
