import { useState } from 'react';
import { UseMutationResult, useQueryClient } from 'react-query';
import {
  ICreateListParams,
  IList,
} from '../../../lib/interfaces/list.interface';
import { useCreateList } from '../../../lib/mutations/list.mutation';
import InputBox from '../input-box/InputBox';

export interface IAddListForm {}

const AddListForm: React.FC<IAddListForm> = () => {
  const [name, setName] = useState<string>('');
  const queryClient = useQueryClient();

  const mutation: UseMutationResult<IList, Error, ICreateListParams> =
    useCreateList(queryClient);

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
