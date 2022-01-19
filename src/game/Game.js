import React, { Component,useState } from "react";
import { connect } from "react-redux";
import Board from "./Board";
import xImage from "../images/x.png";
import oImage from "../images/o.png";
import { resetGameState, createNewGame } from "../redux/actionCreators";
import { setGameMode, setWhoMoveFirst, setAITurn, setXWin, setOWin, setDraw } from "../redux/actionCreators";
import PieceChooser from "./PieceChooser";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TimerStart from "./TimerStart";
let maze= parseInt(localStorage.getItem("maze"));

export class Game extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
  }
  state = {
    open: false,
  };

  resetGame() {
    if (!this.props.isGameEnd) {
      this.props.resetGame();
    let maze= parseInt(localStorage.getItem("maze"));
      this.props.setWhoMoveFirst(Array(maze).fill(null));
      this.props.createNewGame(Array(maze).fill(null));
    } else {
      clearTimeout(this.timeout);
      this.props.createNewGame();
      let maze= parseInt(localStorage.getItem("maze"));
      // this.props.setWhoMoveFirst(Array(maze).fill(null));
      // this.props.createNewGame(Array(maze).fill(null));
      console.log(this.props.createNewGame)
    }
  }

  handleGameEnd() {
    this.timeout = setTimeout(this.props.createNewGame, 1500);
    // this.timeout = setTimeout(this.props.createNewGame(Array(16).fill(null)),15000);
    //  console.log(this.timeout)
    // let maze= parseInt(localStorage.getItem("maze"));
    // this.props.setWhoMoveFirst(Array(maze).fill(null));
    // this.props.createNewGame(Array(maze).fill(null));
  }

  openSettings() {
   this.setState({open: true});
  }

  setPayer() {
    if(this.props.isPvP===true)
    this.props.setGameMode(false);
    else
    this.props.setGameMode(true);
   }

  handleClickOpen = () => {
    this.open=true;
  };

   handleClose = () => {
    this.open=false;
  };

  selectMaze3 =()=>{
    localStorage.setItem("maze", 9);
    this.props.setWhoMoveFirst(Array(9).fill(null));
    this.props.createNewGame(Array(9).fill(null));
    this.setState({open:false});
  }
  selectMaze4 =()=>{
    localStorage.setItem("maze", 16);
    this.props.setWhoMoveFirst(Array(16).fill(null));
    this.props.createNewGame(Array(16).fill(null));
    this.setState({open:false});
  }
  selectMaze5 =()=>{
    localStorage.setItem("maze", 25);
    this.props.setWhoMoveFirst(Array(25).fill(null));
    this.props.createNewGame(Array(25).fill(null));
    this.setState({open:false});
  }
  render() {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
      <div className="game-wrap">
        <PieceChooser />
{/* {alert(this.props.isGameEnd)} */}
<div style={{textAlign:"center",padding:"10px"}}><span><TimerStart/></span> </div>
        <div className="status">
          <div className="status-o">
            <span className="win-counter">{this.props.oWinCounter} {this.props.oWinCounter < 2 ? 'win' : 'wins'}</span>
          </div>
          <div className="status-x">
            <span className="win-counter">{this.props.xWinCounter} {this.props.xWinCounter < 2 ? 'win' : 'wins'}</span>
          </div>
          <div className="status-d">
            <span className="win-counter">{this.props.drawCounter} {this.props.drawCounter < 2 ? 'draw' : 'draws'}</span>
          </div>
        </div>
        <Board onGameEnd={() => this.handleGameEnd()} />

        <div className="move-status-wrap">
          <div className="move-status">
            <span className={'x-move' + (this.props.isTurnX && !this.props.isGameEnd ? ' active' : '')}>
              <img src={xImage} alt="x" />
            </span>
            <span className={'o-move' + (!this.props.isTurnX && !this.props.isGameEnd ? ' active' : '')}>
              <img src={oImage} alt="o" />
            </span>
          </div>
        </div>

        <div className="buttons-wrap">
          <button className="button-reset" onClick={() => this.resetGame()}></button>
          <div className="game-mode-status" onClick={()=>this.setPayer()}>{this.props.isPvP ? '2 Players' : '1 Player'}</div>
          <button className="button-config" onClick={() =>this.openSettings()}></button>
        </div>
<div className="board-wrap">
      <Dialog
        open={this.state.open}
        onClose={this.handleClose()}
         //TransitionComponent={Transition}
         keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Select the size of maze?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <div className="buttons">
        <Button onClick={this.selectMaze3}><h1>3×3</h1></Button>  
          <Button onClick={this.selectMaze4}><h1>4×4</h1></Button>
          <Button onClick={this.selectMaze5}><h1>5×5</h1></Button>
          </div>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={this.handleClose()}>Disagree</Button>
          <Button onClick={this.handleClose()}>Agree</Button>
        </DialogActions> */}
      </Dialog>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    xWinCounter: state.xWinCounter,
    oWinCounter: state.oWinCounter,
    drawCounter: state.drawCounter,
    isTurnX: state.isTurnX,
    squares:state.squares,
    isGameEnd: state.isGameEnd,
    isPvP: state.isPvP,
    winner:state.winner
  };
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
