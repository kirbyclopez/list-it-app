export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, ...divProps }) => {
  return (
    <div {...divProps} className="min-h-screen bg-gray-100 flex flex-col">
      {children}
    </div>
  );
};

export default PrimaryLayout;
