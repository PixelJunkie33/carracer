import React from "react";

const Coordinate = ({ data, width, height, carPosition }) => {

    return (
<>
<svg width={width} height={height}>
      {/* Draw axes */}
      <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="black" />
      <line x1={width / 2} y1={0} x2={width / 2} y2={height} stroke="black" />
      
      {/* Plot data points */}
      {data.map((point, index) => (

        <circle
          key={index}
          cx={width- point.x} // calculate x coordinate
          cy={height - point.y} // calculate y coordinate
          r={4}
          fill="blue"

        />
      ))}
    </svg>
</>
    )
}

export default Coordinate;