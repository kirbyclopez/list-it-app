import { ComponentMeta, ComponentStory } from '@storybook/react';
import TodoListItem, { ITodoListItem } from './TodoListItem';
import { mockTodoListItemProps } from './TodoListItem.mocks';

export default {
  title: 'lists/TodoListItem',
  component: TodoListItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TodoListItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TodoListItem> = (args) => (
  <TodoListItem {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockTodoListItemProps.base,
} as ITodoListItem;
