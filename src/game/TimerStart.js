import React, { useEffect, useState, Component } from "react";
// import "./styles.css";

/**https://stackoverflow.com/questions/63409136/set-countdown-timer-react-js */
  //   60s (for 3x3),
  //   120s (for 4x4) or
  //  180s (for 5x5) 

let RESET_INTERVAL_S = 30; // 300s = 5m * 60s/m

const formatTime = (time) =>
  `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
    time % 60
  ).padStart(2, "0")}`;

const Timer = ({ time }) => {
  var maze = localStorage.getItem("maze");
  maze=parseInt(maze)
let RESET_INTERVAL_S = 30; // 300s = 5m * 60s/m
if(maze===9){
  RESET_INTERVAL_S=60;
}
else if(maze===16){
  RESET_INTERVAL_S=120;

}
else if(maze===25){
  RESET_INTERVAL_S=180;
}
  const timeRemain = RESET_INTERVAL_S - (time % RESET_INTERVAL_S);

  return (
    <>
      {/* <div>Time: {formatTime(time)}</div> */}
      {/* <div>Countdown Timer: {formatTime(timeRemain)}</div> */}
      <div style={{fontSize:"30px"}}>{formatTime(timeRemain)}</div>
    </>
  );
};

const IntervalTimerFunctional = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {

  //   60s (for 3x3),
  //   120s (for 4x4) or
  //  180s (for 5x5) 
      const timerId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
      return () => clearInterval(timerId);
    
  
  }, []);

  return <Timer time={time} />;
};

// class IntervalTimerClass extends Component {
//   state = {
//     time: 0
//   };

//   timerId = null;

//   componentDidMount() {
//     this.timerId = setInterval(() => {
//       this.setState((prevState) => ({ time: prevState.time + 1 }));
//     }, 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerId);
//   }

//   render() {
//     return <Timer time={this.state.time} />;
//   }
// }

export default function TimerStart() {
  return (
    <div className="App">
      {/* <h1>Functional Interval Timer</h1> */}
      <IntervalTimerFunctional />

      {/* <h1>Class-based Interval Timer</h1>
      <IntervalTimerClass /> */}
    </div>
  );
}
