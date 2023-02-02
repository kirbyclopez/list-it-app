import { toast } from 'react-hot-toast';
import { QueryClient, useMutation } from 'react-query';
import {
  IContext,
  ICreateItemParams,
  IDeleteItemParams,
  IEditItemParams,
  IItem,
} from '../interfaces/item.interface';
import { IMessageResponse } from '../interfaces/list.interface';
import { createItem, deleteItem, editItem } from '../services/item.service';

export const useCreateItem = (queryClient: QueryClient) => {
  return useMutation<IItem, Error, ICreateItemParams, IContext | undefined>(
    'addItem',
    async ({ listId, name }) => createItem(listId, name),
    {
      onMutate: async (variables: ICreateItemParams) => {
        await queryClient.cancelQueries(['items', variables.listId]);

        const previousItems: IItem[] | undefined = queryClient.getQueryData([
          'items',
          variables.listId,
        ]);

        queryClient.setQueryData(
          ['items', variables.listId],
          (old: IItem[] | undefined) =>
            old
              ? [...old, { name: variables.name, isComplete: false } as IItem]
              : []
        );

        return { previousItems };
      },
      onSuccess: (
        _data: IItem,
        variables: ICreateItemParams,
        _context: IContext | undefined
      ) => {
        toast.success('Successfully added new item.');
        queryClient.invalidateQueries(['items', variables.listId]);
      },
      onError: (
        _error: Error,
        variables: ICreateItemParams,
        context: IContext | undefined
      ) => {
        queryClient.setQueryData(
          ['items', variables.listId],
          context?.previousItems
        );
      },
      onSettled: (
        _data: IItem | undefined,
        _error: Error | null,
        variables: ICreateItemParams | undefined,
        _context: IContext | undefined
      ) => {
        queryClient.invalidateQueries(['items', variables?.listId]);
      },
    }
  );
};

export const useEditItem = (queryClient: QueryClient) => {
  return useMutation<IItem, Error, IEditItemParams, IContext | undefined>(
    'editItem',
    async ({ listId, _id, name, isComplete }) =>
      editItem(_id, name, isComplete),
    {
      onMutate: async (variables: IEditItemParams) => {
        await queryClient.cancelQueries(['items', variables?.listId]);

        const previousItems: IItem[] | undefined = queryClient.getQueryData([
          'items',
          variables?.listId,
        ]);

        queryClient.setQueryData(
          ['items', variables?.listId],
          (old: IItem[] | undefined) =>
            old
              ? old.map((item) =>
                  item._id !== variables._id
                    ? item
                    : {
                        ...item,
                        name: variables.name,
                        isComplete: variables.isComplete,
                      }
                )
              : []
        );

        return { previousItems };
      },
      onSuccess: (
        _data: IItem,
        variables: IEditItemParams,
        _context: IContext | undefined
      ) => {
        toast.success('Successfully saved changes.');
        queryClient.invalidateQueries(['items', variables?.listId]);
      },
      onError: (
        _error: Error,
        variables: IEditItemParams,
        context: IContext | undefined
      ) => {
        queryClient.setQueryData(
          ['items', variables?.listId],
          context?.previousItems
        );
      },
      onSettled: (
        _data: IItem | undefined,
        _error: Error | null,
        variables: IEditItemParams | undefined,
        _context: IContext | undefined
      ) => {
        queryClient.invalidateQueries(['items', variables?.listId]);
      },
    }
  );
};

export const useDeleteItem = (queryClient: QueryClient) => {
  return useMutation<
    IMessageResponse,
    Error,
    IDeleteItemParams,
    IContext | undefined
  >('deleteItem', async ({ _id, listId }) => deleteItem(_id), {
    onMutate: async (variables: IDeleteItemParams) => {
      await queryClient.cancelQueries(['items', variables?.listId]);

      const previousItems: IItem[] | undefined = queryClient.getQueryData([
        'items',
        variables?.listId,
      ]);

      queryClient.setQueryData(
        ['items', variables?.listId],
        (old: IItem[] | undefined) =>
          old ? old.filter((item) => item._id !== variables._id) : []
      );

      return { previousItems };
    },
    onSuccess: (
      _data: IMessageResponse,
      variables: IDeleteItemParams,
      _context: IContext | undefined
    ) => {
      toast.success('Successfully deleted item.');
      queryClient.invalidateQueries(['items', variables?.listId]);
    },
    onError: (
      _error: Error,
      variables: IDeleteItemParams,
      context: IContext | undefined
    ) => {
      queryClient.setQueryData(
        ['items', variables?.listId],
        context?.previousItems
      );
    },
    onSettled: (
      _data: IMessageResponse | undefined,
      _error: Error | null,
      variables: IDeleteItemParams | undefined,
      _context: IContext | undefined
    ) => {
      queryClient.invalidateQueries(['items', variables?.listId]);
    },
  });
};
