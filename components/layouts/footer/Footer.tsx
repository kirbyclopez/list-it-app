export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ ...footerProps }) => {
  return (
    <footer
      {...footerProps}
      className="footer footer-center w-full p-4 bg-gray-300 text-gray-800"
    >
      <div className="text-center">
        <p>
          Copyright © 2023 - {''}
          <a className="font-semibold" href="mailto:kirbyclopez@gmail.com">
            klcodes
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
