import { types } from "./reducers";

export const setXWin = () => ({
  type: types.SET_X_WIN,
});

export const setOWin = () => ({
  type: types.SET_O_WIN,
});

export const setDraw = () => ({
  type: types.SET_DRAW,
});

export const createNewGame = (squares) => ({
  type: types.CREATE_NEW_GAME,
  squares: squares,
});

export const resetGameState = (squares) => ({
  type: types.RESET_GAME_STATE,
  squares: squares,
});

export const setWhoMoveFirst = (isXMoveFirst,squares) => ({
  type: types.SET_WHO_MOVE_FIRST,
  isXMoveFirst: isXMoveFirst,
  squares: squares,
});

export const makeMove = (squares) => ({
  type: types.MAKE_MOVE,
  squares: squares,
});

export const setGameMode = (isPvp) => ({
  type: types.SET_GAME_MODE,
  isPvp: isPvp,
})

export const setGameStart = (start) => ({
  type: types.SET_GAME_START,
  start: start,
})

export const setAITurn = (isTurnAI) => ({
  type: types.SET_AI_TURN,
  isTurnAI: isTurnAI,
})

export const setSquares = (squares) => ({
  type: types.SET_SQUARSE,
  squares: squares,
})
