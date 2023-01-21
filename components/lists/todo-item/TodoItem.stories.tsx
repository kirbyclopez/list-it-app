import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoItem, { ITodoItem } from './TodoItem';
import { mockTodoItemProps } from './TodoItem.mocks';

export default {
  title: 'lists/TodoItem',
  component: TodoItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TodoItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoItem> = (args) => (
  <TodoItem {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTodoItemProps.base,
} as ITodoItem;
