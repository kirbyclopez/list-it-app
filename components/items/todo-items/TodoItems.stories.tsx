import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TodoItems, { ITodoItems } from './TodoItems';
import { mockTodoItemsProps } from './TodoItems.mocks';

export default {
  title: 'items/TodoItems',
  component: TodoItems,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TodoItems>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoItems> = (args) => {
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
      <TodoItems {...args} />
    </QueryClientProvider>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTodoItemsProps.base,
} as ITodoItems;
