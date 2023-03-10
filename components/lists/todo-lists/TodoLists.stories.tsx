import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoLists, { ITodoLists } from './TodoLists';
import { mockTodoListsProps } from './TodoLists.mocks';

export default {
  title: 'lists/TodoLists',
  component: TodoLists,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TodoLists>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoLists> = (args) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TodoLists {...args} />
    </QueryClientProvider>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTodoListsProps.base,
} as ITodoLists;
