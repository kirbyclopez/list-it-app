import { ComponentPropsWithoutRef } from 'react';
import AddListForm from '../../forms/add-list-form/AddListForm';
import { ITodoListItem } from '../todo-list-item/TodoListItem';
import TodoLists from '../todo-lists/TodoLists';

export interface ITodoListCrud extends ComponentPropsWithoutRef<'div'> {
  lists: ITodoListItem[];
}

const TodoListCrud: React.FC<ITodoListCrud> = ({ lists, ...divProps }) => {
  return (
    <div className="max-w-xl w-full mx-auto my-10 bg-white p-8 rounded-xl space-y-6 shadow shadow-slate-300">
      <h1 className="text-center text-3xl font-medium">Task Lists</h1>
      <AddListForm />
      <TodoLists lists={lists} />
    </div>
  );
};

export default TodoListCrud;
