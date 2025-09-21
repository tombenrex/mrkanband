import { useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../utils/asset';
import { ThemeDropdown } from '@board';
import { TrashModal } from '@modal';

export default function Header() {
  const [showTrash, setShowTrash] = useState(false);

  return (
    <header className="w-full border-b-2 border-secondary">
      <Link to="/" className="logo-link" aria-label="Start page">
        <img
          src={asset('images/logo.png')}
          alt="Logo"
          className="logo-img mx-auto max-w-xs md:max-w-sm lg:max-w-md"
        />
      </Link>
      <div className="flex justify-end pt-2">
        <button
          onClick={() => setShowTrash(true)}
          className="px-3 py-1 bg-secondary text-white rounded cursor-pointer"
        >
          Trash
        </button>
      </div>
      <ThemeDropdown />
      {showTrash && <TrashModal onClose={() => setShowTrash(false)} />}
    </header>
  );
}
