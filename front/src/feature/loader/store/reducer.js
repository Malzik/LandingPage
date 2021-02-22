const initialState = 0;

export function loadingReducer(state = initialState, action = {}) {
  let newState = state;

  switch (action.type) {
    case 'START_REQUEST':
      newState = state + 1;
      break;

    case 'END_REQUEST':
      newState = state - 1;
      break;

    default:
      break;
  }

  return newState;
}
