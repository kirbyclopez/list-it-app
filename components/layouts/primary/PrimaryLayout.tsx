import { Toaster } from 'react-hot-toast';

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, ...divProps }) => {
  return (
    <div {...divProps} className="min-h-screen bg-gray-100 flex flex-col">
      <Toaster position="top-right" reverseOrder={true} />
      {children}
    </div>
  );
};

export default PrimaryLayout;
