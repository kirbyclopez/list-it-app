import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddListForm, { IAddListForm } from './AddListForm';
import { mockAddListFormProps } from './AddListForm.mocks';

export default {
  title: 'forms/AddListForm',
  component: AddListForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AddListForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddListForm> = (args) => {
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
      <AddListForm {...args} />
    </QueryClientProvider>
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockAddListFormProps.base,
} as IAddListForm;
