import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const lastTime = useRef(Date.now());
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      const now = Date.now();
      const delta = now - lastTime.current;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = distance / delta; // pixels per ms

      setPosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: now, speed },
      ]);

      lastTime.current = now;
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.filter((p) => Date.now() - p.id < 400)); // trail fades after 400ms
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Star Cursor */}
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: '30px',
          height: '30px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          animation: 'twinkle 1.5s infinite ease-in-out',
          mixBlendMode: 'screen',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="url(#gradient)"
          stroke="white"
          strokeWidth="1"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#ff9a9e" />
              <stop offset="50%" stopColor="#fad0c4" />
              <stop offset="100%" stopColor="#fbc2eb" />
            </linearGradient>
          </defs>
          <path d="M12 2l2.39 7.26H22l-5.81 4.22L17.58 22 12 17.77 6.42 22l1.39-8.52L2 9.26h7.61z" />
        </svg>
      </div>

      {/* Shooting Star Trail */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      >
        <defs>
          <linearGradient id="trailGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#a18cd1" />
            <stop offset="50%" stopColor="#fbc2eb" />
            <stop offset="100%" stopColor="#fad0c4" />
          </linearGradient>
        </defs>
        {trail.map((p, index) => {
          const life = (Date.now() - p.id) / 400; // 0 to 1
          const width = 10 * (1 - life); // starts thick, becomes thin
          return (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={width / 2}
              fill="url(#trailGradient)"
              opacity={1 - life}
            />
          );
        })}
      </svg>

      {/* Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
        }
      `}</style>
    </>
  );
}
