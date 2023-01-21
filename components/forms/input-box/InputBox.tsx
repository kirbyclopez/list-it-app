export interface IInputBox extends React.ComponentPropsWithoutRef<'input'> {
  type?: string;
  value: string;
  onChange: (_e: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputBox: React.FC<IInputBox> = ({
  type = 'text',
  value,
  onChange,
  className,
  ...inputProps
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`border rounded-lg px-3 py-2 text-sm w-full ${className}`}
      {...inputProps}
    />
  );
};

export default InputBox;
