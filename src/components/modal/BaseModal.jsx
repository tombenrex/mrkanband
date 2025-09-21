import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export default function BaseModal({
  onClose,
  children,
  overlayClass = '',
  modalClass = '',
}) {
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity animate-fade-in ${overlayClass}`}
    >
      <div
        className={`
          relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
          rounded-xl shadow-2xl bg-base-100 border-2 border-secondary
          px-4 py-6 sm:px-8 sm:py-8
          transition-all
          ${modalClass}
        `}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="btn btn-sm btn-ghost absolute top-2 right-2 m-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          onClick={onClose}
          aria-label="Stäng"
        >
          &#10005;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

BaseModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  overlayClass: PropTypes.string,
  modalClass: PropTypes.string,
};
