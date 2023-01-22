import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { instance } from '../../../lib/axios';
import { ITodoListItem } from '../../lists/todo-list-item/TodoListItem';
import InputBox from '../input-box/InputBox';

export interface IAddListForm {}
export interface ICreateListParams {
  name: string;
}
interface IContext {
  previousLists: ITodoListItem[] | undefined;
}

export const createList = async (name: string): Promise<ITodoListItem> => {
  const data = { name };
  const res: AxiosResponse = await instance.post('/api/lists', data, {
    withCredentials: true,
  });

  return res.data;
};

const AddListForm: React.FC<IAddListForm> = () => {
  const [name, setName] = useState<string>('');

  const queryClient = useQueryClient();

  const mutation: UseMutationResult<ITodoListItem, Error, ICreateListParams> =
    useMutation<ITodoListItem, Error, ICreateListParams, IContext | undefined>(
      'addList',
      async ({ name }) => createList(name),
      {
        onMutate: async (variables: ICreateListParams) => {
          await queryClient.cancelQueries('lists');

          const previousLists: ITodoListItem[] | undefined =
            queryClient.getQueryData('lists');

          queryClient.setQueryData(
            'lists',
            (old: ITodoListItem[] | undefined) =>
              old ? [...old, { name: variables.name } as ITodoListItem] : []
          );

          return { previousLists };
        },
        onSuccess: (
          _data: ITodoListItem,
          _variables: ICreateListParams,
          _context: IContext | undefined
        ) => {
          toast.success('Successfully added new list.');
          queryClient.invalidateQueries('lists');
        },
        onError: (
          _error: Error,
          _variables: ICreateListParams,
          context: IContext | undefined
        ) => {
          queryClient.setQueryData('lists', context?.previousLists);
        },
        onSettled: (
          _data: ITodoListItem | undefined,
          _error: Error | null,
          _variables: ICreateListParams | undefined,
          _context: IContext | undefined
        ) => {
          queryClient.invalidateQueries('lists');
        },
      }
    );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ name });

    setName('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-10 xs:p-0 flex flex-row items-center space-x-1"
    >
      <InputBox
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Create a new list..."
      />
      <button
        type="submit"
        className="transition duration-200 bg-green-700 hover:bg-green-800 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-700 focus:ring-opacity-50 text-white px-6 py-[9px] rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
      >
        <span className="inline-block">
          <i className="fa-solid fa-plus"></i>
        </span>
      </button>
    </form>
  );
};

export default AddListForm;
