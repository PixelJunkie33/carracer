import React, { useState, useEffect } from 'react';
import './RaceTrack.css';

const RacingTrack = ({ carPosition, setCarPosition, carSpeed, setCarSpeed }) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setTrackWidth(window.innerWidth);
      setTrackHeight(window.innerHeight * 0.8);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        setCarPosition((prev) => ({ ...prev, x: prev.x - 10 }));
        break;
      case 'ArrowRight':
        setCarPosition((prev) => ({ ...prev, x: prev.x + 10 }));
        break;
      case 'ArrowUp':
        setCarSpeed(Math.min(carSpeed + 1, 100));
        break;
      case 'ArrowDown':
        setCarSpeed(Math.max(carSpeed - 1, 0));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCarPosition((prev) => ({
        x: prev.x,
        y: prev.y + carSpeed,
      }));
    }, 50);

    return () => clearInterval(intervalId);
  }, [carSpeed]);


  return (
    <div className="racing-track" style={{ width: trackWidth, height: trackHeight }} onKeyDown={handleKeyDown} tabIndex={0}>
      </div>
  );
};

export default RacingTrack;