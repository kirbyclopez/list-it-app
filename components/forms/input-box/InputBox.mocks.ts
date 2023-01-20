import { IInputBox } from './InputBox';

const base: IInputBox = {
  type: 'text',
  value: 'Sample input',
  onChange: () => {},
};

export const mockInputBoxProps = {
  base,
};
