export interface IInputBox extends React.ComponentPropsWithoutRef<'input'> {
  type?: string;
  value: string;
  onChange: (_e: React.FormEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<IInputBox> = ({
  type = 'text',
  value,
  onChange,
  ...inputProps
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      {...inputProps}
    />
  );
};

export default InputBox;
