export interface ITodoItem {}

const TodoItem: React.FC<ITodoItem> = () => {
  return (
    <div
      id="task"
      className="flex justify-between items-center border-b border-slate-200 py-3 px-2 border-l-4  border-l-transparent"
    >
      <div className="inline-flex items-center space-x-3">
        <div>
          <i className="fa-regular fa-circle-check text-green-500"></i>
        </div>
        <div className="text-slate-500 line-through">YT Intro remix</div>
      </div>
      <div>
        <i className="fa-regular fa-trash-can text-slate-500 hover:text-slate-700"></i>
      </div>
    </div>
  );
};

export default TodoItem;
