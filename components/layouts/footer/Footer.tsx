import Image from 'next/image';
import Link from 'next/link';
import klcodesLogo from '../../../public/images/klcodes-logo-primary-text.png';

export interface IFooter extends React.ComponentPropsWithoutRef<'footer'> {}

const Footer: React.FC<IFooter> = ({ ...footerProps }) => {
  return (
    <footer
      {...footerProps}
      className="footer footer-center w-full p-2 md:p-4 bg-gray-100 text-gray-400"
    >
      <div className="text-center">
        <p>
          <Link href="https://www.klcodes.com/">
            <Image
              src={klcodesLogo}
              alt="klcodes Logo"
              height={25}
              width={25}
              className="inline-block mt-[-2px] mr-1"
            />
          </Link>
          © 2023 klcodes
        </p>
      </div>
    </footer>
  );
};

export default Footer;
