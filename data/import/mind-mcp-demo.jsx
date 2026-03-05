import React, { useState, useEffect } from 'react';

// Substance profiles (from our YAML schema)
const SUBSTANCES = {
  nicotine: {
    name: 'Nicotine',
    emoji: '🚬',
    color: '#f97316',
    peakMinutes: 3,
    halfLifeMinutes: 120,
    bioavailability: 0.9,
    defaultDose: 1,
    effects: { focus: +15, alertness: +10, anxiety: +5 }
  },
  thc: {
    name: 'THC',
    emoji: '🌿',
    color: '#3fb950',
    peakMinutes: 10,
    halfLifeMinutes: 180,
    bioavailability: 0.3,
    defaultDose: 1,
    effects: { focus: -10, creativity: +20, anxiety: -15 }
  },
  cbd: {
    name: 'CBD',
    emoji: '💊',
    color: '#a371f7',
    peakMinutes: 60,
    halfLifeMinutes: 360,
    bioavailability: 0.35,
    defaultDose: 1,
    effects: { focus: +5, anxiety: -30, calm: +25 }
  }
};

// Pharmacokinetic calculation
function calculateLevel(intake, nowMs) {
  const substance = SUBSTANCES[intake.substance];
  const elapsedMin = (nowMs - intake.timestamp) / 60000;
  
  if (elapsedMin < 0) return 0;
  
  const peakMin = substance.peakMinutes;
  const halfLife = substance.halfLifeMinutes;
  const dose = intake.dose * substance.bioavailability;
  
  let level;
  if (elapsedMin <= peakMin) {
    // Rising phase - linear rise to peak
    level = dose * (elapsedMin / peakMin);
  } else {
    // Decay phase - exponential decay
    const decayTime = elapsedMin - peakMin;
    level = dose * Math.pow(0.5, decayTime / halfLife);
  }
  
  return Math.max(0, level);
}

// Get phase description
function getPhase(intake, nowMs) {
  const substance = SUBSTANCES[intake.substance];
  const elapsedMin = (nowMs - intake.timestamp) / 60000;
  const level = calculateLevel(intake, nowMs);
  
  if (level < 0.01) return 'baseline';
  if (elapsedMin <= substance.peakMinutes) return 'rising';
  if (level > 0.5) return 'peak';
  if (level > 0.1) return 'declining';
  return 'trace';
}

export default function MindMCPDemo() {
  const [intakes, setIntakes] = useState([]);
  const [now, setNow] = useState(Date.now());
  const [mood, setMood] = useState(50);
  const [showHistory, setShowHistory] = useState(false);
  
  // Update every second for real-time display
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Log intake
  const logIntake = (substanceKey) => {
    const newIntake = {
      id: Date.now(),
      substance: substanceKey,
      dose: SUBSTANCES[substanceKey].defaultDose,
      timestamp: Date.now()
    };
    setIntakes(prev => [...prev, newIntake]);
  };
  
  // Calculate current levels per substance
  const currentLevels = {};
  Object.keys(SUBSTANCES).forEach(key => {
    const substanceIntakes = intakes.filter(i => i.substance === key);
    const totalLevel = substanceIntakes.reduce((sum, intake) => {
      return sum + calculateLevel(intake, now);
    }, 0);
    currentLevels[key] = Math.min(totalLevel, 2); // Cap at 2x for display
  });
  
  // Calculate cognitive effects
  const effects = { focus: 0, alertness: 0, anxiety: 0, creativity: 0, calm: 0 };
  Object.entries(currentLevels).forEach(([key, level]) => {
    const substance = SUBSTANCES[key];
    Object.entries(substance.effects).forEach(([effect, value]) => {
      effects[effect] = (effects[effect] || 0) + value * level;
    });
  });
  
  // Format time ago
  const timeAgo = (timestamp) => {
    const mins = Math.floor((now - timestamp) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    return `${Math.floor(mins/60)}h ${mins%60}m ago`;
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1117',
      color: '#e6edf3',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', color: '#e6edf3' }}>
          mind-mcp
        </h1>
        <p style={{ fontSize: '14px', color: '#8b949e', margin: 0 }}>
          Cognitive State Tracker — Demo
        </p>
      </div>
      
      {/* Substance Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        {Object.entries(SUBSTANCES).map(([key, substance]) => (
          <button
            key={key}
            onClick={() => logIntake(key)}
            style={{
              background: '#161b22',
              border: `2px solid ${substance.color}`,
              borderRadius: '16px',
              padding: '20px 32px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              minWidth: '120px'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = substance.color + '20'}
            onMouseOut={(e) => e.currentTarget.style.background = '#161b22'}
          >
            <span style={{ fontSize: '32px' }}>{substance.emoji}</span>
            <span style={{ color: substance.color, fontWeight: '600', fontSize: '14px' }}>
              {substance.name}
            </span>
          </button>
        ))}
      </div>
      
      {/* Current Levels */}
      <div style={{
        background: '#161b22',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '14px', color: '#8b949e', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Current Levels
        </h2>
        
        {Object.entries(SUBSTANCES).map(([key, substance]) => {
          const level = currentLevels[key];
          const percentage = Math.min(level * 100, 100);
          const recentIntake = intakes.filter(i => i.substance === key).slice(-1)[0];
          const phase = recentIntake ? getPhase(recentIntake, now) : 'baseline';
          
          return (
            <div key={key} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{substance.emoji}</span>
                  <span style={{ color: substance.color }}>{substance.name}</span>
                </span>
                <span style={{ color: '#8b949e', fontSize: '13px' }}>
                  {percentage.toFixed(0)}% • {phase}
                </span>
              </div>
              <div style={{
                background: '#0d1117',
                borderRadius: '8px',
                height: '12px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: `linear-gradient(90deg, ${substance.color}, ${substance.color}88)`,
                  height: '100%',
                  width: `${percentage}%`,
                  borderRadius: '8px',
                  transition: 'width 0.5s ease-out'
                }} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Cognitive Effects */}
      <div style={{
        background: '#161b22',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '14px', color: '#8b949e', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Cognitive State
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { key: 'focus', label: 'Focus', icon: '🎯' },
            { key: 'alertness', label: 'Alertness', icon: '⚡' },
            { key: 'anxiety', label: 'Anxiety', icon: '😰' },
            { key: 'creativity', label: 'Creativity', icon: '✨' },
            { key: 'calm', label: 'Calm', icon: '🧘' }
          ].map(({ key, label, icon }) => {
            const value = effects[key] || 0;
            const isPositive = (key === 'anxiety' ? value < 0 : value > 0);
            const displayValue = key === 'anxiety' ? -value : value;
            
            return (
              <div key={key} style={{
                background: '#0d1117',
                borderRadius: '8px',
                padding: '12px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
                <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>{label}</div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: value === 0 ? '#8b949e' : (isPositive ? '#3fb950' : '#f97316')
                }}>
                  {displayValue > 0 ? '+' : ''}{displayValue.toFixed(0)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Mood Input */}
      <div style={{
        background: '#161b22',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '14px', color: '#8b949e', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Subjective State
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '24px' }}>😫</span>
          <input
            type="range"
            min="0"
            max="100"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            style={{
              flex: 1,
              height: '8px',
              borderRadius: '4px',
              background: `linear-gradient(90deg, #f97316 0%, #3fb950 100%)`,
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '24px' }}>😊</span>
          <span style={{ 
            background: '#0d1117', 
            padding: '8px 16px', 
            borderRadius: '8px',
            fontWeight: '600',
            minWidth: '50px',
            textAlign: 'center'
          }}>
            {mood}
          </span>
        </div>
      </div>
      
      {/* Recent History */}
      <div style={{
        background: '#161b22',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: showHistory ? '16px' : '0',
            cursor: 'pointer'
          }}
          onClick={() => setShowHistory(!showHistory)}
        >
          <h2 style={{ fontSize: '14px', color: '#8b949e', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
            History ({intakes.length})
          </h2>
          <span style={{ color: '#58a6ff', fontSize: '12px' }}>
            {showHistory ? '▲ Hide' : '▼ Show'}
          </span>
        </div>
        
        {showHistory && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {intakes.length === 0 ? (
              <p style={{ color: '#8b949e', fontSize: '13px', margin: 0 }}>
                No intakes logged yet. Tap a substance button above.
              </p>
            ) : (
              intakes.slice().reverse().slice(0, 10).map(intake => {
                const substance = SUBSTANCES[intake.substance];
                return (
                  <div key={intake.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    background: '#0d1117',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}>
                    <span>{substance.emoji}</span>
                    <span style={{ color: substance.color }}>{substance.name}</span>
                    <span style={{ color: '#8b949e', marginLeft: 'auto' }}>
                      {timeAgo(intake.timestamp)}
                    </span>
                    <span style={{ 
                      color: '#3fb950', 
                      fontSize: '11px',
                      background: '#3fb95020',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {getPhase(intake, now)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '24px', 
        color: '#8b949e', 
        fontSize: '12px' 
      }}>
        mind-mcp demo • Mind Protocol
      </div>
    </div>
  );
}
