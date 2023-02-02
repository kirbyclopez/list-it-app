import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddItemForm, { IAddItemForm } from './AddItemForm';
import { mockAddItemFormProps } from './AddItemForm.mocks';

export default {
  title: 'forms/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => {
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
      <AddItemForm {...args} />
    </QueryClientProvider>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockAddItemFormProps.base,
} as IAddItemForm;
