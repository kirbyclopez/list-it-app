import { ComponentPropsWithoutRef, useEffect, useState } from 'react';
import InputBox from '../../forms/input-box/InputBox';

export interface ITodoItem extends ComponentPropsWithoutRef<'div'> {
  _id: string;
  name: string;
  isComplete: boolean;
  isEdit: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (_name: string) => void;
  onCancel: () => void;
}

const TodoItem: React.FC<ITodoItem> = ({
  _id,
  name,
  isComplete,
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
  }, [name, isEdit]);

  return (
    <div
      {...divProps}
      className={`flex items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent space-x-6 hover:bg-slate-50 ${
        isEdit ? 'border-l-green-600' : ''
      }`}
    >
      {!isEdit ? (
        <div className="inline-flex items-center flex-1 space-x-3">
          <i
            className={`fa-regular cursor-pointer ${
              isComplete
                ? 'fa-circle-check text-green-500'
                : 'fa-circle text-slate-500'
            }`}
          ></i>
          <label
            className={`flex-1 border-b-transparent ${
              isComplete ? 'text-slate-500 line-through' : 'text-slate-700'
            }`}
          >
            {name}
          </label>
        </div>
      ) : (
        <div className="inline-flex flex-1">
          <InputBox
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            className="px-0 py-0 border-0 text-base rounded-none bg-transparent focus:ring-blue-500"
          />
        </div>
      )}
      <div className="inline-flex space-x-4">
        {!isEdit && (
          <>
            <button title="Edit" onClick={onEdit}>
              <i className="fa-solid fa-pencil text-slate-500 hover:text-green-600"></i>
            </button>
            <button title="Delete" onClick={onDelete}>
              <i className="fa-solid fa-trash-can text-slate-500 hover:text-red-500"></i>
            </button>
          </>
        )}
        {isEdit && (
          <>
            <button title="Save" onClick={() => onSave(text)}>
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

export default TodoItem;
