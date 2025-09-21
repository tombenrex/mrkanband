import { useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../../utils/asset';
import { ThemeDropdown } from '@board';
import { TrashModal } from '@modal';

export default function Header() {
  const [showTrash, setShowTrash] = useState(false);

  return (
    <header className="w-full bg-base-100 text-base-content border-b-2 border-secondary px-4 py-2 mb-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <Link to="/" className="logo-link" aria-label="Start page">
          <img
            src={asset('images/logo.webp')}
            alt="Logo"
            className="logo-img mx-auto max-w-xs md:max-w-sm lg:max-w-md"
          />
        </Link>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <button
            onClick={() => setShowTrash(true)}
            className="btn btn-secondary"
          >
            Trash
          </button>
          <ThemeDropdown />
        </div>
      </div>
      {showTrash && <TrashModal onClose={() => setShowTrash(false)} />}
    </header>
  );
}
