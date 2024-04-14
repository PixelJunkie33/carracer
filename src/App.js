import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RaceTrack.css';


const App = () => {
  // State variables for the simulation
  const [initialVelocity, setInitialVelocity] = useState(0);
  const [finalVelocity, setFinalVelocity] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [time, setTime] = useState(0);
  const [time2, setTime2] = useState(0);
  const [carPosition, setCarPosition] = useState({ x: 500, y: 400 });
  const [calculationType, setCalculationType] = useState(1);
  const [compacceleration, setCompAcceleration] = useState(0);
  const [compTime, setCompTime] = useState(0);
  const [compFinalVelocity, setCompFinalVelocity] = useState(0);
  const [compInitialVelocity, setCompInitialVelocity] = useState(0);
  const [instantaneousVelocity, setInstantaneousVelocity] = useState(0);
  //const [position, setPosition] = useState(50); // Initial position of the car

  // const moveUp = () => {
  //   setPosition((prevPosition) => prevPosition - 10); // Move the car up by 10 pixels
  // };

  // // Function to move the car down
  // const moveDown = () => {
  //   setPosition((prevPosition) => prevPosition + 10); // Move the car down by 10 pixels
  // };



  // // Event listener to handle arrow key presses
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === 'ArrowUp') {
  //       moveUp();
  //     } else if (event.key === 'ArrowDown') {
  //       moveDown();
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);

  //   };
  // }, []);



  function calculateAcceleration(finalVelocity, initialVelocity, time2, time) {
    // Calculating the difference in velocities
    const velocityDifference = finalVelocity - initialVelocity;
    // Calculating the difference in time
    const timeDifference = time2- time;
    
    // Calculating acceleration
  const Compacceleration = velocityDifference / timeDifference;
    
    return setCompAcceleration(Compacceleration);
  }

  function calculateTime(finalVelocity, initialVelocity, acceleration) {
    // Calculating the difference in velocities
    const velocityDifference = finalVelocity - initialVelocity;
    // Calculating time
    const time = velocityDifference / acceleration;

    return setCompTime(time);
  }

  function calculateFinalVelocity(initialVelocity, acceleration, time2) {
    // Calculating final velocity
  const finalVelocity = initialVelocity + (acceleration * time2);
    
    return setCompFinalVelocity(finalVelocity);
  }

  function calculateInitialVelocity(finalVelocity, acceleration, time2) {
    // Calculating initial velocity
    const initialVelocity = finalVelocity - (acceleration * time2);
    
    return setCompInitialVelocity(initialVelocity);
  }

  function calculateInstantaneousVelocity(initialVelocity, acceleration, time2, time) {
    // Calculating instantaneous velocity
    const averageV= (finalVelocity - initialVelocity) / (time2 - time);
    return setInstantaneousVelocity(averageV);

  }


  


  

  // Event handler for updating car position based on user input
  const updateCarPosition = () => {
    let newX = 0;
    let newY = 0;

    // Switch statement to determine the calculation based on calculationType
    switch (calculationType) {
      case 1: // Calculate acceleration
      newX = 500;
      newY = calculateAcceleration(finalVelocity, initialVelocity, time2, time);
      break;

  
      case 2: // Calculate time
        newX = calculateTime(finalVelocity, initialVelocity, acceleration);
        newY = 400;
        break;

      case 3: // Calculate final velocity
        newX = 500;
        newY = calculateFinalVelocity(initialVelocity, acceleration, time2)
        break;

      case 4: // Calculate initial velocity
        newX = time;
        newY = calculateInitialVelocity(finalVelocity, acceleration, time2);
        break;

      case 5: // Calculate Instantaneous velocity (default)
        newX = time;
        newY = calculateInstantaneousVelocity(initialVelocity, acceleration, time2, time);
        break;

      default:
        break;

    }

    // Update car position
    setCarPosition({ x: newX, y: newY });
   
  };

  // Event handlers for input changes
  const handleInitialVelocityChange = (event) => {
    setInitialVelocity(parseFloat(event.target.value));
  };

  const handleFinalVelocityChange = (event) => {
    setFinalVelocity(parseFloat(event.target.value));
  }

  const handleAccelerationChange = (event) => {
    setAcceleration(parseFloat(event.target.value));
  };

  const handleTimeChange = (event) => {
    setTime(parseFloat(event.target.value));
  };

  const handleTime2Change = (event) => {
    setTime2(parseFloat(event.target.value));
  }

  // Event handler for submitting the form
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    updateCarPosition(); // Update car position when form is submitted
  };

  // Coordinate graph component
// Coordinate graph component
const CoordinateGraph = ({ data, width, height }) => {
  // Define the range of values for the x and y axes
  const xRange = Array.from({ length: 21 }, (_, index) => (index - 10) * 5);
  const yRange = Array.from({ length: 21 }, (_, index) => (index - 10) * 5);

  // Calculate the scaling factors for x and y coordinates
  const xScale = width / 125; // Divide width by 2 times 100 to scale from -100 to 100
  const yScale = height / 125; // Divide height by 2 times 100 to scale from -100 to 100

  return (
    <svg width={width} height={height}>
      {/* Draw x-axis ticks */}
      {xRange.map((tick) => (
        <text
          key={`x-${tick}`}
          x={width / 2 + tick * xScale}
          y={height / 2 + 15}
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {tick}
        </text>
      ))}
      
      {/* Draw y-axis ticks */}
      {yRange.map((tick) => (
        <text
          key={`y-${tick}`}
          x={width / 2 - 15}
          y={height / 2 - tick * yScale}
          textAnchor="end"
          alignmentBaseline="middle"
        >
          {tick}
        </text>
      ))}

      {/* Draw axes */}
      <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="black" />
      <line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke="black" />
      
      {/* Plot data points */}
      {data.map((point, index) => (
        <circle
          key={index}
          cx={width / 2 + point.x * xScale} // calculate x coordinate
          cy={height / 2 - point.y * yScale} // calculate y coordinate
          r={4}
          fill="blue"
        />
      ))}
    </svg>
  );
};



  return (
    <>
     <div className="App container">
      <div className="row">
        <div className="col-md-4">
          {/* Side panel for user input */}
          <div className="card">
            <div className="card-header">User Input</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="initialVelocity">Initial Velocity (m/s):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="initialVelocity"
                    value={initialVelocity}
                    onChange={handleInitialVelocityChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="finalVelocity">Final Velocity (m/s):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="finalVelocity"
                    value={finalVelocity}
                    onChange={handleFinalVelocityChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="acceleration">Acceleration (m/s²):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="acceleration"
                    value={acceleration}
                    onChange={handleAccelerationChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time 1 (s):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="time"
                    value={time}
                    onChange={handleTimeChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time2">Time 2(s):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="time2"
                    value={time2}
                    onChange={handleTime2Change}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="calculationType">Calculation Type:</label>
                  <select
                    className="form-control mb-3"
                    id="calculationType"
                    value={calculationType}
                    onChange={(event) => setCalculationType(parseInt(event.target.value))}
                  >
                    <option value={1}>Calculate Acceleration</option>
                    <option value={2}>Calculate Time</option>
                    <option value={3}>Calculate Final Velocity</option>
                    <option value={4}>Calculate Initial Velocity</option>
                    <option value={5}>Calculate Instantaneous Velocity</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <div className="row mt-3">
        <div className="col">
    
          <p>Final Velocity: {compFinalVelocity}</p>
          <p>Acceleration: {compacceleration} </p>
          <p>Initial Velocity: {compInitialVelocity}</p>
          <p>Time: {compTime}</p>
          <p>Average Velocity: {instantaneousVelocity}</p>
        </div>
      </div>
            </div>
          </div>
        </div>
        {/* Coordinate graph */}
        <div className="col-md-8">
          <div className="Frame">
            <CoordinateGraph data={[carPosition]} width={1000} height={800} />
          </div>
        </div>
      </div>
      {/* Display car position */}
      {/* <div className="race-track">
        <div className="car" style={{ top: `${position}px` }}></div>
      </div>
      <div className="controls">
        <button onClick={moveUp}>Move Up</button>
        <button onClick={moveDown}>Move Down</button>
      </div> */}
    </div>
    </>
  );
}

export default App;
