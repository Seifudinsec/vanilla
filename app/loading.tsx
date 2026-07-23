export default function Loading() {
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f1e9', zIndex: 100 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '2px solid rgba(17,17,17,0.08)', borderTopColor: '#c7a27c', borderRadius: '50%', margin: '0 auto', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}