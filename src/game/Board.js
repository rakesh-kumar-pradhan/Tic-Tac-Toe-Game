import React, { Component } from "react";
import { connect } from "react-redux";
import Square from "./Square";
import {
  makeMove,
  setAITurn,
  setXWin,
  setOWin,
  setDraw,
  setWhoMoveFirst,
  setSquares,
  createNewGame,
} from "../redux/actionCreators";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Board as GameBoard, findBestMove } from "./ai";

var maze1 = localStorage.getItem("maze");
maze1=parseInt(maze1)
export class Board extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    maze: parseInt(localStorage.getItem("maze")),
  };

  calculateWinner(squares) {
    if (this.state.maze === 9) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          console.log([squares[a], a + "-" + c]);
          return [squares[a], a + "-" + c];
        }
      }
    } else if (this.state.maze === 16) {
      let lines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c] &&
          squares[a] === squares[d]
        ) {
          console.log([squares[a], a + "-" + d]);
          return [squares[a], a + "-" + d];
        }
      }
    } else if (this.state.maze === 25) {
      let lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c] &&
          squares[a] === squares[d] &&
          squares[a] === squares[e]
        ) {
          console.log([squares[a], a + "-" + e]);
          return [squares[a], a + "-" + e];
        }
      }
    }

    return [squares.filter((square) => square === null).length === 0, false];
  }

  handleClick(i, ai = false) {
    if (
      this.props.isGameEnd ||
      this.props.squares[i] !== null ||
      (!ai && !this.props.isPvP && this.props.isTurnAI)
    ) {
      return;
    }

    const squares = this.props.squares.slice();
    squares[i] = this.props.isTurnX ? "x" : "o";
    this.props.makeMove(squares);
    const [winner] = this.calculateWinner(squares);

    if (winner) {

      if(this.props.player ===winner){
      NotificationManager.success('Congratulation Won !!', 'Congratulation!', 1700, () => {
      });
    }
    else if(winner===true){
      NotificationManager.warning('The match is draw. ', 'Better luck next time !', 5000, () => {
      });
    }
    else{
      NotificationManager.info('You did well, better luck next time. ', 'Better luck next time !', 5000, () => {
      });
    }

      this.props.setWinner(winner);
      this.props.onGameEnd();
    } else if (!this.props.isPvP && !ai) {
      this.props.setAITurn(true);
    }
  }

  aiMove() {
    if (!this.props.isGameEnd && !this.props.isPvP && this.props.isTurnAI) {
      const move =
        this.props.squares.filter((square) => square).length === 0
          ? Math.floor(Math.random() * this.props.squares.length)
          : findBestMove(
              new GameBoard(this.props.squares, this.props.isTurnX ? "x" : "o")
            );

      this.handleClick(move, true);
      this.props.setAITurn(false);
    }
  }

  componentDidUpdate() {
    this.aiMove();
  }

  renderSquare(i) {
    if(this.props.start===true){
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
    }else{
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.handleClick()}
        />
      );
    }
  }

  render() {
    let winningLineClass = "";

    if (this.props.isGameEnd) {
      const [, dir] = this.calculateWinner(this.props.squares);

      if (dir) {
        winningLineClass = " winning-line-wrap-" + dir;
      }
    }
    var maze = localStorage.getItem("maze");
    maze = parseInt(maze);
    this.state.maze = parseInt(localStorage.getItem("maze"));
    return (
      <div className="board-wrap">
       <NotificationContainer/>
        <div className={"winning-line-wrap" + winningLineClass}>
          <div className="winning-line" />
        </div>

        {maze === 9 ? (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        ) : maze === 16 ? (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
            </div>
            <div className="board-row">
              {this.renderSquare(4)}
              {this.renderSquare(5)}
              {this.renderSquare(6)}
              {this.renderSquare(7)}
            </div>
            <div className="board-row">
              {this.renderSquare(8)}
              {this.renderSquare(9)}
              {this.renderSquare(10)}
              {this.renderSquare(11)}
            </div>
            <div className="board-row">
              {this.renderSquare(12)}
              {this.renderSquare(13)}
              {this.renderSquare(14)}
              {this.renderSquare(15)}
            </div>
          </div>
        ) : (
          <div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
              {this.renderSquare(3)}
              {this.renderSquare(4)}
            </div>
            <div className="board-row">
              {this.renderSquare(5)}
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
              {this.renderSquare(9)}
            </div>
            <div className="board-row">
              {this.renderSquare(10)}
              {this.renderSquare(11)}
              {this.renderSquare(12)}
              {this.renderSquare(13)}
              {this.renderSquare(14)}
            </div>
            <div className="board-row">
              {this.renderSquare(15)}
              {this.renderSquare(16)}
              {this.renderSquare(17)}
              {this.renderSquare(18)}
              {this.renderSquare(19)}
            </div>
            <div className="board-row">
              {this.renderSquare(20)}
              {this.renderSquare(21)}
              {this.renderSquare(22)}
              {this.renderSquare(23)}
              {this.renderSquare(24)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    squares: state.squares,
    isTurnX: state.isTurnX,
    isPvP: state.isPvP,
    player: state.player,
    start:state.start,
    isTurnAI: state.isTurnAI,
    isGameEnd: state.isGameEnd,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeMove: (squares) => {
      dispatch(makeMove(squares));
    },
    setAITurn: (isTurnAI) => {
      dispatch(setAITurn(isTurnAI));
    },
    setWinner: (winner) => {
      if (winner === "x") {
        dispatch(setXWin());
      } else if (winner === "o") {
        dispatch(setOWin());
      } else {
        dispatch(setDraw());
      }
    },
    createNewGame: (squares) => {
      dispatch(createNewGame(squares));
    },
    setSquares: (squares) => {
      dispatch(setSquares(squares));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
