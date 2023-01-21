import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoListCrud, { ITodoListCrud } from './TodoListCrud';
import { mockTodoListCrudProps } from './TodoListCrud.mocks';

export default {
  title: 'lists/TodoListCrud',
  component: TodoListCrud,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TodoListCrud>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoListCrud> = (args) => (
  <TodoListCrud {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTodoListCrudProps.base,
} as ITodoListCrud;
