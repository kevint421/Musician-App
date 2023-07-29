import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Timer from './Timer.js';

const MetronomeContainer = styled.div`
  font-family: 'Raleway', sans-serif;
  color: #525252;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const BpmDisplay = styled.div`
  width: 100%;
  text-align: center;
  color: #2339e9;
  font-weight: bold;
  position: relative;

  .tempo {
    font-size: 4em;
  }

  .beat-circle {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background-color: #2339e9;
    border-radius: 50%;
    border: 2px solid #000;
    opacity: ${props => (props.showBeat ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }
`;

const TempoText = styled.div`
  font-size: 0.8em;
  text-transform: uppercase;
  text-align: center;
`;

const TempoSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .adjust-tempo-btn {
    width: 30px;
    height: 30px;
    font-size: 24px;
    border-radius: 50%;
    border: 1px solid #ddd;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .decrease-tempo:hover {
    background: #2339E9;
    color: #fff;
  }

  .increase-tempo:hover {
    background: #2339E9;
    color: #fff;
  }
`;

const BeatDivisionSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const BeatDivisionButton = styled.div`
  width: 50px;
  height: 50px;
  font-size: 0.7em;
  text-align: center;
  background: ${props => (props.selected ? '#2339E9' : 'transparent')};
  border-radius: 50%;
  color: ${props => (props.selected ? '#fff' : '#525252')};
  line-height: 50px;
  cursor: pointer;
  transition: background 0.2s ease-in-out, color 0.2s ease-in-out;

  :hover {
    background: #374AE7;
    color: #fff;
  }
`;

const BeatDivisionText = styled.div`
  text-align: center;
  font-size 0.15em;
  text-transform: uppercase;
`;

const StartStop = styled.div`
  width: 50px;
  height: 50px;
  font-size: 0.7em;
  text-align: center;
  background: #2339E9;
  border-radius: 50%;
  color: #fff;
  line-height: 50px;
  margin-top: 10px;
  cursor: pointer;

  :hover {
    background: #374AE7;
  }
`;

const Metronome = () => {
  const [bpm, setBpm] = useState(140);
  const [isRunning, setIsRunning] = useState(false);
  const [showBeat, setShowBeat] = useState(false);
  const [beatDivision, setBeatDivision] = useState('quarter');

  const metronomeRef = useRef(null);

  useEffect(() => {
    metronomeRef.current = new Timer(playClick, 60000 / bpm, { immediate: true });
    if (isRunning) {
      metronomeRef.current.start();
    }
    return () => {
      metronomeRef.current.stop();
    };
  }, [bpm, isRunning]);

  const decreaseTempo = () => {
    if (bpm > 20) {
      setBpm(prevBpm => prevBpm - 1);
    }
  };

  const increaseTempo = () => {
    if (bpm < 280) {
      setBpm(prevBpm => prevBpm + 1);
    }
  };

  const handleTempoSliderChange = event => {
    const newBpm = Number(event.target.value);
    setBpm(newBpm);
  };

  const handleBeatDivisionChange = division => {
    setBeatDivision(division);
  };

  const startStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const playClick = () => {
    click1.play();
    click1.currentTime = 0;

    setShowBeat(true); // Show the beat circle
    setTimeout(() => setShowBeat(false), 135);
    playBeatDivision();
  };

  const playBeatDivision = () => {
    const divisions = {
      quarter: [],
      eighth: [0.5],
      triplet: [0.33, 0.67],
      sixteenth: [0.25, 0.5, 0.75],
    };

    const beats = divisions[beatDivision];

    beats.forEach(beat => {
      setTimeout(() => {
        click2.play();
        click2.currentTime = 0;
      }, (60000 / bpm) * beat);
    });
  };

  const click1 = new Audio('/sounds/metronometick.mp3');
  const click2 = new Audio('/sounds/tick2.mp3');

  return (
    <MetronomeContainer>
      <BpmDisplay showBeat={showBeat}>
        <span className="beat-circle" />
        <span className="tempo">{bpm}</span>
        <span className="bpm">BPM</span>
      </BpmDisplay>
      <TempoSettings>
        <div className="adjust-tempo-btn decrease-tempo" onClick={decreaseTempo}>
          -
        </div>
        <input
          type="range"
          min="20"
          max="280"
          step="1"
          className="slider"
          value={bpm}
          onChange={handleTempoSliderChange}
        />
        <div className="adjust-tempo-btn increase-tempo" onClick={increaseTempo}>
          +
        </div>
      </TempoSettings>
      <BeatDivisionSettings>
        <BeatDivisionButton
          selected={beatDivision === 'quarter'}
          onClick={() => handleBeatDivisionChange('quarter')}
        >
          Quarter
        </BeatDivisionButton>
        <BeatDivisionButton
          selected={beatDivision === 'eighth'}
          onClick={() => handleBeatDivisionChange('eighth')}
        >
          Eighth
        </BeatDivisionButton>
        <BeatDivisionButton
          selected={beatDivision === 'triplet'}
          onClick={() => handleBeatDivisionChange('triplet')}
        >
          Triplet
        </BeatDivisionButton>
        <BeatDivisionButton
          selected={beatDivision === 'sixteenth'}
          onClick={() => handleBeatDivisionChange('sixteenth')}
        >
          Sixteenth
      </BeatDivisionButton>
      </BeatDivisionSettings>
      <BeatDivisionText>Beat Subdivision</BeatDivisionText>
      <StartStop onClick={startStop}>{isRunning ? 'STOP' : 'START'}</StartStop>
    </MetronomeContainer>
  );
};

export default Metronome;