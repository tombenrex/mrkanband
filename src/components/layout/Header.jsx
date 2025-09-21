import { Link } from 'react-router-dom';
import { asset } from '../../utils/asset';
import { ThemeDropdown } from '@board';

export default function Header() {
  return (
    <header className="w-full border-b-2 border-secondary">
      <Link to="/" className="logo-link" aria-label="Start page">
        <img
          src={asset('images/logo.png')}
          alt="Logo"
          className="logo-img mx-auto max-w-xs md:max-w-sm lg:max-w-md"
        />
      </Link>
      <ThemeDropdown />
    </header>
  );
}
