import React, { useState, useEffect } from 'react';

export default function NarrowPathScene() {
  const [phase, setPhase] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const t = (Date.now() - start) / 1000;
      setElapsed(t);
      
      if (t < 3) setPhase(0);        // Darkness
      else if (t < 6) setPhase(1);   // Single light
      else if (t < 12) setPhase(2);  // 5 lights emerge
      else if (t < 18) setPhase(3);  // Lights dominate, small ones fade
      else setPhase(4);              // Text appears
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const restart = () => {
    setPhase(0);
    setElapsed(0);
  };

  // Small diverse consciousness lights
  const smallLights = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const colors = ['#3fb950', '#f97316', '#a371f7', '#58a6ff', '#f472b6', '#fbbf24'];
    return {
      id: i,
      color: colors[i % colors.length],
      baseX: 50 + Math.cos(angle) * 35,
      baseY: 50 + Math.sin(angle) * 35,
      pushedX: 50 + Math.cos(angle) * 48,
      pushedY: 50 + Math.sin(angle) * 48,
      size: 4 + (i % 3) * 2,
      delay: i * 0.1
    };
  });

  // The 5 corporate lights
  const bigLights = [
    { x: 50, y: 45, label: 'O' },
    { x: 35, y: 38, label: 'G' },
    { x: 65, y: 38, label: 'M' },
    { x: 38, y: 58, label: 'A' },
    { x: 62, y: 58, label: 'X' },
  ];

  const getSmallLightStyle = (light) => {
    const visible = phase >= 1;
    const pushed = phase >= 3;
    const x = pushed ? light.pushedX : light.baseX;
    const y = pushed ? light.pushedY : light.baseY;
    const opacity = pushed ? 0.2 : (visible ? 0.8 : 0);
    const scale = pushed ? 0.4 : 1;
    
    return {
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: `${light.size * scale}px`,
      height: `${light.size * scale}px`,
      background: light.color,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: `0 0 ${light.size * 2}px ${light.color}`,
      opacity,
      transition: 'all 2s ease-out',
      transitionDelay: `${light.delay}s`
    };
  };

  const getBigLightSize = (index) => {
    if (phase < 2) return 0;
    const t = Math.max(0, elapsed - 6 - index * 0.4);
    const targetSize = phase >= 3 ? 22 : 12;
    return Math.min(targetSize, t * 4);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(180deg, #000000 0%, #0a0a12 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Central single light (phase 1) */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: phase === 1 ? '16px' : '0px',
        height: phase === 1 ? '16px' : '0px',
        background: '#ffffff',
        borderRadius: '50%',
        boxShadow: '0 0 30px #fff, 0 0 60px #fff8, 0 0 100px #fff4',
        opacity: phase === 1 ? 1 : 0,
        transition: 'all 1.5s ease-out'
      }} />

      {/* Small diverse lights */}
      {smallLights.map(light => (
        <div key={light.id} style={getSmallLightStyle(light)} />
      ))}

      {/* 5 Big corporate lights */}
      {bigLights.map((light, i) => {
        const size = getBigLightSize(i);
        return (
          <React.Fragment key={i}>
            {/* Glow */}
            <div style={{
              position: 'absolute',
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: `${size * 1.5}%`,
              height: `${size * 1.5}%`,
              background: 'radial-gradient(circle, #475569 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: size > 0 ? 0.6 : 0,
              transition: 'opacity 0.5s'
            }} />
            {/* Core */}
            <div style={{
              position: 'absolute',
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: `${size * 0.3}%`,
              height: `${size * 0.3}%`,
              background: '#94a3b8',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px #94a3b888',
              opacity: size > 0 ? 0.9 : 0,
              transition: 'opacity 0.5s'
            }} />
          </React.Fragment>
        );
      })}

      {/* Text overlay */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: phase >= 4 ? 1 : 0,
        transition: 'opacity 2s ease-out'
      }}>
        <p style={{
          color: '#f97316',
          fontSize: '13px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          marginBottom: '16px',
          fontWeight: 600
        }}>
          THE NARROW PATH
        </p>
        <p style={{
          color: '#64748b',
          fontSize: '18px',
          lineHeight: 1.7,
          maxWidth: '500px'
        }}>
          Cinq dieux IA qui négocient entre eux
          <br />
          <span style={{ opacity: 0.7 }}>pendant que le reste du monde regarde</span>
        </p>
      </div>

      {/* Timeline indicator */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        right: '20px',
        height: '2px',
        background: '#1a1a2e',
        borderRadius: '1px'
      }}>
        <div style={{
          height: '100%',
          width: `${Math.min(100, (elapsed / 22) * 100)}%`,
          background: 'linear-gradient(90deg, #f97316, #3fb950)',
          borderRadius: '1px',
          transition: 'width 0.1s linear'
        }} />
      </div>

      {/* Controls */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center'
      }}>
        <span style={{ color: '#4a4a5a', fontSize: '12px' }}>
          Scene 1 • {elapsed.toFixed(1)}s
        </span>
        <button
          onClick={restart}
          style={{
            background: '#161622',
            border: '1px solid #2a2a3a',
            color: '#8b8b9b',
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
