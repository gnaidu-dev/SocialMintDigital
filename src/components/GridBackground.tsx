// Static CSS-only grid — zero JS, zero scroll listeners, zero main thread cost
export default function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-bg">
      <div
        className="absolute w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)]" />
    </div>
  );
}
