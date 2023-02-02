import { useState } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';
import {
  ICreateItemParams,
  IItem,
} from '../../../lib/interfaces/item.interface';
import { useCreateItem } from '../../../lib/mutations/item.mutation';
import InputBox from '../input-box/InputBox';

export interface IAddItemForm {
  listId: string;
}

const AddItemForm: React.FC<IAddItemForm> = ({ listId }) => {
  const [name, setName] = useState<string>('');
  const queryClient = useQueryClient();

  const mutation: UseMutationResult<IItem, Error, ICreateItemParams> =
    useCreateItem(queryClient);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ listId, name });
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
        placeholder="Add new item..."
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

export default AddItemForm;
