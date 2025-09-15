export default function TrashArea({ visible }) {
  return (
    <div
      id="trash"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '80px',
        height: '80px',
        background: '#ff3b3b',
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        fontWeight: 'bold',
        fontSize: '32px',
        zIndex: 999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s',
      }}
    >
      🗑️
    </div>
  );
}
