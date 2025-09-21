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
      className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClass}`}
    >
      <div className={`relative w-2/3 ${modalClass}`}>
        <button
          className="btn btn-sm btn-ghost absolute top-2 right-2 border-secondary m-2"
          onClick={onClose}
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
