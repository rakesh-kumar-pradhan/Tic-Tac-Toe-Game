// types
export const types = {
  SET_X_WIN: "SET_X_WIN",
  SET_O_WIN: "SET_O_WIN",
  SET_DRAW: "SET_DRAW",
  MAKE_MOVE: "MAKE_MOVE",
  CREATE_NEW_GAME: "CREATE_NEW_GAME",
  RESET_GAME_STATE: "RESET_GAME_STATE",
  SET_WHO_MOVE_FIRST: "SET_WHO_MOVE_FIRST",
  SET_GAME_MODE: "SET_GAME_MODE",
  SET_AI_TURN: "SET_AI_TURN",
  SET_GAME_START:"SET_GAME_START",
};


// initial state
export const initialState = {
  isGameEnd: false,
  xWinCounter: 0,
  oWinCounter: 0,
  drawCounter: 0,
  squares: Array(maze).fill(null),
  isTurnX: true,
  isPvP: false,
  start:false,
  player: null,
  isTurnAI: false,
  winner: false,
};

//  localStorage.setItem("maze",9);
var maze = localStorage.getItem("maze");
maze=parseInt(maze)
// let initialState1 ={profile: JSON.parse(localStorage.getItem('profile'))};
// let initialState ;

if(maze!=null){
 initialState.maze=maze;
}else{
  initialState =initialState;
}
// root reducer
export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_X_WIN:
      return {
        ...state,
        xWinCounter: state.xWinCounter + 1,
        isGameEnd: true,
        isTurnX: false,
        isTurnAI: state.player === 'x',
        winner: 'x',
      };

    case types.SET_O_WIN:
      return {
        ...state,
        oWinCounter: state.oWinCounter + 1,
        isGameEnd: true,
        isTurnX: true,
        isTurnAI: state.player === 'o',
        winner: 'o',
      };

    case types.SET_DRAW:
      return {
        ...state,
        drawCounter: state.drawCounter + 1,
        isGameEnd: true,
        isTurnAI: !state.isTurnX && state.player === 'x',
        winner: false,
      };

    case types.CREATE_NEW_GAME:
      return {
        ...state,
        squares: action.squares ?action.squares:Array(maze).fill(null),
        isGameEnd: false,
        player: (state.isTurnX && !state.isTurnAI) || (!state.isTurnX && state.isTurnAI) ? 'x' : 'o',
      };

    case types.RESET_GAME_STATE:
      return { ...initialState };

    case types.SET_WHO_MOVE_FIRST:
      return {
        ...state,
        isTurnX: action.isXMoveFirst,
        squares:  action.squares ?action.squares:Array(maze).fill(null),
        isGameEnd: false,
        player: (state.isTurnX && !state.isTurnAI) || (!state.isTurnX && state.isTurnAI) ? 'x' : 'o',
      }

    case types.MAKE_MOVE:
      return {
        ...state,
        squares: action.squares,
        isTurnX: !state.isTurnX,
      }

    case types.SET_GAME_MODE:
      return {
        ...state,
        isPvP: action.isPvp
      }

      case types.SET_GAME_START:
        return {
          ...state,
          start:action.start
        }
        
    case types.SET_AI_TURN:
      return {
        ...state,
        isTurnAI: action.isTurnAI
      }

    default:
      return state;
  }
};

export default rootReducer;
