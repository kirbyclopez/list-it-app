import { ComponentPropsWithoutRef } from 'react';
import TodoListItem, { ITodoListItem } from '../todo-list-item/TodoListItem';

export interface ITodoLists extends ComponentPropsWithoutRef<'div'> {
  lists: ITodoListItem[];
}

const TodoLists: React.FC<ITodoLists> = ({ lists, ...divProps }) => {
  return (
    <div {...divProps} className="my-5">
      {lists.length > 0 &&
        lists.map((list, idx) => <TodoListItem key={idx} {...list} />)}
      {lists.length === 0 && (
        <p className="text-center text-slate-400">
          No lists to show. Create one now.
        </p>
      )}
    </div>
  );
};

export default TodoLists;