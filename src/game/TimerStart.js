import React, { useEffect, useState, Component } from "react";
import { connect } from "react-redux";
import { propTypes } from "react-spacer";
import { resetGameState, createNewGame } from "../redux/actionCreators";
import { setGameMode, setWhoMoveFirst, setAITurn, setXWin, setOWin, setDraw } from "../redux/actionCreators";
// import "./styles.css";

/**https://stackoverflow.com/questions/63409136/set-countdown-timer-react-js */
  //   60s (for 3x3),
  //   120s (for 4x4) or
  //  180s (for 5x5) 

let RESET_INTERVAL_S = 30; // 300s = 5m * 60s/m
localStorage.setItem("maze",9);
const formatTime = (time) =>
  `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
    time % 60
  ).padStart(2, "0")}`;

const Timer = ({ time }) => {
  var maze = localStorage.getItem("maze");
  maze=parseInt(maze)
let RESET_INTERVAL_S =0; // 300s = 5m * 60s/m
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
      <div style={{fontSize:"30px",     boxShadow: "rgb(124 233 253) 0px 20px 20px 0px",
    borderRadius: "0px 20px 0px 20px"}}>{formatTime(timeRemain)}</div>
    </>
  );
};

const IntervalTimerFunctional = (props) => {
const [time, setTime] = useState(0);
var maze = localStorage.getItem("maze");
  maze=parseInt(maze)
  // alert(props.start)

  useEffect(() => {
  //   60s (for 3x3),
  //   120s (for 4x4) or
  //  180s (for 5x5) 
  // alert(props.winner +"winner")
  if(props.start===true){
  if(maze===9){
    setTime(0);
  }
  else if(maze===16){
    setTime(0);
  }
  else if(maze===25){
    setTime(0);
  }

  const timerId = setInterval(() => {
    setTime((t) => t + 1);
  }, 1000);
  return () => clearInterval(timerId);
}
  
  }, [maze,props.start, props.winner]);

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

 function TimerStart(props) {

// alert(props.winner+ 1)
  return (
    <div className="App">
    
      {/* <h1>Functional Interval Timer</h1> */}
      <IntervalTimerFunctional  start={props.start} winner={props.winner}/>

      {/* <h1>Class-based Interval Timer</h1>
      <IntervalTimerClass /> */}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    squares: state.squares,
    isTurnX: state.isTurnX,
    isPvP: state.isPvP,
    isTurnAI: state.isTurnAI,
    isGameEnd: state.isGameEnd,
    start:state.start,
    winner:state.winner,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetGame: () => dispatch(resetGameState()),
    setGameMode: isPvp => {
      dispatch(setGameMode(isPvp));
    },
    setWhoMoveFirst:squares =>{
      dispatch(setWhoMoveFirst(squares));
    },
    createNewGame: (squares) => {
      dispatch(createNewGame(squares));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TimerStart);


