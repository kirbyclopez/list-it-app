import { ComponentPropsWithoutRef } from 'react';

export interface ITodoListItem extends ComponentPropsWithoutRef<'div'> {
  id: string;
  name: string;
}

const TodoListItem: React.FC<ITodoListItem> = ({ id, name, ...divProps }) => {
  return (
    <div
      {...divProps}
      className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent"
    >
      <div className="inline-flex items-center space-x-3">
        <div className="text-gray-700">{name}</div>
      </div>
      <div className="inline-flex space-x-4">
        <button title="Edit">
          <i className="fa-solid fa-pencil text-slate-500 hover:text-green-600"></i>
        </button>
        <button title="Delete">
          <i className="fa-solid fa-trash-can text-slate-500 hover:text-red-500"></i>
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
