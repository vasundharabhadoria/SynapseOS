export default function BackgroundOrbs() {
  return (
    <>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-25 orb-1"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }}
        />
        <div
          className="absolute -top-20 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-20 orb-2"
          style={{ background: 'radial-gradient(circle, #f0abfc, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)', animation: 'orb-float-2 18s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-5"
          style={{ background: 'radial-gradient(circle, #c4b5fd, transparent 60%)' }}
        />
      </div>
    </>
  );
}