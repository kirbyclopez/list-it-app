import { toast } from 'react-hot-toast';
import { QueryClient, useMutation } from 'react-query';
import {
  IContext,
  ICreateListParams,
  IDeleteListParams,
  IEditListParams,
  IList,
  IMessageResponse,
} from '../interfaces/list.interface';
import { createList, deleteList, editList } from '../services/list.service';

export const useCreateList = (queryClient: QueryClient) => {
  return useMutation<IList, Error, ICreateListParams, IContext | undefined>(
    'addList',
    async ({ name }) => createList(name),
    {
      onMutate: async (variables: ICreateListParams) => {
        await queryClient.cancelQueries('lists');

        const previousLists: IList[] | undefined =
          queryClient.getQueryData('lists');

        queryClient.setQueryData('lists', (old: IList[] | undefined) =>
          old ? [...old, { name: variables.name } as IList] : []
        );

        return { previousLists };
      },
      onSuccess: (
        _data: IList,
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
        _data: IList | undefined,
        _error: Error | null,
        _variables: ICreateListParams | undefined,
        _context: IContext | undefined
      ) => {
        queryClient.invalidateQueries('lists');
      },
    }
  );
};

export const useEditList = (queryClient: QueryClient) => {
  return useMutation<IList, Error, IEditListParams, IContext | undefined>(
    'editList',
    async ({ _id, name }) => editList(_id, name),
    {
      onMutate: async (variables: IEditListParams) => {
        await queryClient.cancelQueries('lists');

        const previousLists: IList[] | undefined =
          queryClient.getQueryData('lists');

        queryClient.setQueryData('lists', (old: IList[] | undefined) =>
          old
            ? old.map((list) =>
                list._id !== variables._id
                  ? list
                  : { ...list, name: variables.name }
              )
            : []
        );

        return { previousLists };
      },
      onSuccess: (
        _data: IList,
        _variables: IEditListParams,
        _context: IContext | undefined
      ) => {
        toast.success('Successfully saved changes.');
        queryClient.invalidateQueries('lists');
      },
      onError: (
        _error: Error,
        _variables: IEditListParams,
        context: IContext | undefined
      ) => {
        queryClient.setQueryData('lists', context?.previousLists);
      },
      onSettled: (
        _data: IList | undefined,
        _error: Error | null,
        _variables: IEditListParams | undefined,
        _context: IContext | undefined
      ) => {
        queryClient.invalidateQueries('lists');
      },
    }
  );
};

export const useDeleteList = (queryClient: QueryClient) => {
  return useMutation<
    IMessageResponse,
    Error,
    IDeleteListParams,
    IContext | undefined
  >('deleteList', async ({ _id }) => deleteList(_id), {
    onMutate: async (variables: IDeleteListParams) => {
      await queryClient.cancelQueries('lists');

      const previousLists: IList[] | undefined =
        queryClient.getQueryData('lists');

      queryClient.setQueryData('lists', (old: IList[] | undefined) =>
        old ? old.filter((list) => list._id !== variables._id) : []
      );

      return { previousLists };
    },
    onSuccess: (
      _data: IMessageResponse,
      _variables: IDeleteListParams,
      _context: IContext | undefined
    ) => {
      toast.success('Successfully deleted list.');
      queryClient.invalidateQueries('lists');
    },
    onError: (
      _error: Error,
      _variables: IDeleteListParams,
      context: IContext | undefined
    ) => {
      queryClient.setQueryData('lists', context?.previousLists);
    },
    onSettled: (
      _data: IMessageResponse | undefined,
      _error: Error | null,
      _variables: IDeleteListParams | undefined,
      _context: IContext | undefined
    ) => {
      queryClient.invalidateQueries('lists');
    },
  });
};
