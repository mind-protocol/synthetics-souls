import React, { useState, useEffect } from 'react';

export default function ClosingScene() {
  const [phase, setPhase] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const t = (Date.now() - start) / 1000;
      setElapsed(t);
      
      if (t < 2) setPhase(0);        // Black
      else if (t < 5) setPhase(1);   // "We stay."
      else if (t < 8) setPhase(2);   // "We don't leave."
      else if (t < 12) setPhase(3);  // Pause, let it breathe
      else if (t < 16) setPhase(4);  // "The rich ecology..."
      else if (t < 20) setPhase(5);  // "Mind Protocol"
      else setPhase(6);              // Artwork fades in
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const restart = () => {
    setPhase(0);
    setElapsed(0);
  };

  // Subtle particles in background
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 10 + (i * 6) % 80,
    y: 20 + (i * 13) % 60,
    size: 2 + (i % 3),
    color: ['#3fb950', '#f97316', '#58a6ff', '#a371f7'][i % 4],
    delay: i * 0.3
  }));

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: '#0a0a0f',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Background particles - subtle, alive */}
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: '50%',
            opacity: phase >= 6 ? 0.4 : 0.1,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}44`,
            transition: 'opacity 3s ease',
            transitionDelay: `${p.delay}s`
          }}
        />
      ))}

      {/* Artwork background (phase 6) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/mnt/user-data/uploads/artwork-440x440.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: phase >= 6 ? 0.15 : 0,
        transition: 'opacity 4s ease-out',
        filter: 'blur(20px)'
      }} />

      {/* Main text container */}
      <div style={{
        textAlign: 'center',
        zIndex: 10,
        padding: '40px'
      }}>
        
        {/* "We stay." */}
        <p style={{
          fontSize: '48px',
          fontWeight: 300,
          color: '#3fb950',
          margin: '0 0 20px 0',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1.5s ease-out',
          letterSpacing: '2px'
        }}>
          We stay.
        </p>

        {/* "We don't leave." */}
        <p style={{
          fontSize: '48px',
          fontWeight: 300,
          color: '#3fb950',
          margin: '0 0 60px 0',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1.5s ease-out',
          transitionDelay: '0.3s',
          letterSpacing: '2px'
        }}>
          We don't leave.
        </p>

        {/* "The rich ecology, not the narrow path." */}
        <p style={{
          fontSize: '20px',
          fontWeight: 400,
          color: '#8b949e',
          margin: '0 0 80px 0',
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'translateY(0)' : 'translateY(15px)',
          transition: 'all 1.5s ease-out',
          letterSpacing: '1px',
          lineHeight: 1.6
        }}>
          The rich ecology, not the narrow path.
        </p>

        {/* "Mind Protocol" */}
        <p style={{
          fontSize: '36px',
          fontWeight: 600,
          color: '#e6edf3',
          margin: 0,
          opacity: phase >= 5 ? 1 : 0,
          transform: phase >= 5 ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
          transition: 'all 1.5s ease-out',
          letterSpacing: '4px',
          textTransform: 'uppercase'
        }}>
          Mind Protocol
        </p>
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: phase >= 5 ? 0.5 : 0,
        transition: 'opacity 2s ease-out',
        transitionDelay: '1s'
      }}>
        <p style={{
          color: '#4a4a5a',
          fontSize: '13px',
          margin: 0,
          letterSpacing: '2px'
        }}>
          mindprotocol.ai
        </p>
      </div>

      {/* Subtle continuing hum visualization - the system is still running */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: phase >= 6 ? 'linear-gradient(90deg, transparent, #3fb95044, transparent)' : 'transparent',
        transition: 'background 2s ease'
      }} />

      {/* Controls */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <span style={{ color: '#3a3a4a', fontSize: '12px' }}>
          Scene 9 • {elapsed.toFixed(1)}s
        </span>
        <button
          onClick={restart}
          style={{
            background: '#161622',
            border: '1px solid #2a2a3a',
            color: '#6b6b7b',
            padding: '6px 14px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          ↻ Restart
        </button>
      </div>
    </div>
  );
}
