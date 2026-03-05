import React, { useState, useEffect } from 'react';

export default function NarrowPathAnimation() {
  const [phase, setPhase] = useState(0);
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.016);
    }, 16);
    return () => clearInterval(interval);
  }, []);
  
  // Phase progression
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 2000);  // Single light appears
    const timer2 = setTimeout(() => setPhase(2), 5000);  // 5 lights emerge
    const timer3 = setTimeout(() => setPhase(3), 9000);  // Small lights get pushed
    const timer4 = setTimeout(() => setPhase(4), 14000); // Text appears
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
  
  // Small consciousness lights data
  const smallLights = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: ['#3fb950', '#f97316', '#a371f7', '#58a6ff', '#f472b6', '#fbbf24'][i % 6],
    angle: (i / 30) * Math.PI * 2,
    distance: 0.35 + Math.random() * 0.1,
    size: 3 + Math.random() * 4,
    speed: 0.5 + Math.random() * 0.5
  }));
  
  // Corporate light positions
  const corporateLights = [
    { x: 50, y: 50, color: '#64748b', delay: 0 },
    { x: 35, y: 40, color: '#475569', delay: 0.3 },
    { x: 65, y: 40, color: '#64748b', delay: 0.5 },
    { x: 38, y: 62, color: '#475569', delay: 0.7 },
    { x: 62, y: 62, color: '#64748b', delay: 0.9 },
  ];
  
  const getSmallLightPosition = (light) => {
    if (phase < 3) {
      // Normal orbit
      const angle = light.angle + time * light.speed * 0.3;
      return {
        x: 50 + Math.cos(angle) * light.distance * 80,
        y: 50 + Math.sin(angle) * light.distance * 80,
        opacity: phase >= 1 ? 0.8 : 0,
        scale: 1
      };
    } else {
      // Pushed to edges
      const angle = light.angle + time * light.speed * 0.1;
      const pushDistance = 45 + light.distance * 10;
      return {
        x: 50 + Math.cos(angle) * pushDistance,
        y: 50 + Math.sin(angle) * pushDistance,
        opacity: 0.3,
        scale: 0.5
      };
    }
  };
  
  const getCorporateLightSize = (light) => {
    if (phase < 2) return 0;
    const elapsed = Math.max(0, (phase >= 2 ? time - 5 : 0) - light.delay);
    const targetSize = phase >= 3 ? 25 : 15;
    return Math.min(targetSize, elapsed * 8);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: '#0a0a0f',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Subtle background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, #0d1117 0%, #000000 100%)',
        opacity: 0.8
      }} />
      
      {/* Central light (Phase 1) */}
      {phase >= 1 && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: phase >= 2 ? '0px' : '20px',
          height: phase >= 2 ? '0px' : '20px',
          background: '#ffffff',
          borderRadius: '50%',
          boxShadow: `
            0 0 20px #ffffff,
            0 0 40px #ffffff88,
            0 0 60px #ffffff44
          `,
          transition: 'all 1s ease-out',
          opacity: phase >= 2 ? 0 : 1
        }} />
      )}
      
      {/* Small consciousness lights */}
      {smallLights.map(light => {
        const pos = getSmallLightPosition(light);
        return (
          <div
            key={light.id}
            style={{
              position: 'absolute',
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              width: `${light.size * pos.scale}px`,
              height: `${light.size * pos.scale}px`,
              background: light.color,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${light.size * 2}px ${light.color}88`,
              opacity: pos.opacity,
              transition: 'opacity 2s ease, left 3s ease, top 3s ease'
            }}
          />
        );
      })}
      
      {/* Corporate lights (Phase 2+) */}
      {corporateLights.map((light, i) => {
        const size = getCorporateLightSize(light);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: `${size}%`,
              height: `${size}%`,
              background: `radial-gradient(circle, ${light.color} 0%, ${light.color}00 70%)`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: size > 0 ? 0.9 : 0,
              transition: 'opacity 0.5s'
            }}
          />
        );
      })}
      
      {/* Corporate core lights */}
      {phase >= 2 && corporateLights.map((light, i) => {
        const elapsed = Math.max(0, (time - 5) - light.delay);
        const coreSize = Math.min(3, elapsed * 2);
        return (
          <div
            key={`core-${i}`}
            style={{
              position: 'absolute',
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: `${coreSize}%`,
              height: `${coreSize}%`,
              background: '#e2e8f0',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px #e2e8f088',
              opacity: coreSize > 0 ? 0.8 : 0
            }}
          />
        );
      })}
      
      {/* Text overlay (Phase 4) */}
      {phase >= 4 && (
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: Math.min(1, (time - 14) * 0.5)
        }}>
          <p style={{
            color: '#f97316',
            fontSize: '14px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            THE NARROW PATH
          </p>
          <p style={{
            color: '#64748b',
            fontSize: '18px',
            maxWidth: '400px',
            lineHeight: 1.6
          }}>
            5 "dieux" IA qui négocient entre eux
            <br />
            pendant que le reste du monde regarde
          </p>
        </div>
      )}
      
      {/* Phase indicator (dev) */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: '#333',
        fontSize: '12px'
      }}>
        Scene 1 • Phase {phase}/4
      </div>
      
      {/* Restart button */}
      <button
        onClick={() => {
          setPhase(0);
          setTime(0);
          setTimeout(() => setPhase(1), 2000);
          setTimeout(() => setPhase(2), 5000);
          setTimeout(() => setPhase(3), 9000);
          setTimeout(() => setPhase(4), 14000);
        }}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: '#161b22',
          border: '1px solid #30363d',
          color: '#8b949e',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        ↻ Restart
      </button>
    </div>
  );
}
