import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import InputBox, { IInputBox } from './InputBox';
import { mockInputBoxProps } from './InputBox.mocks';

export default {
  title: 'forms/InputBox',
  component: InputBox,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof InputBox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputBox> = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <InputBox
      {...args}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    />
  );
};

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockInputBoxProps.base,
} as IInputBox;
