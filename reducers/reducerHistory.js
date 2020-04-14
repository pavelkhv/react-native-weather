const initialState = {
  historyList: [],
};

const reducerHistory = (state = initialState, { type, history }) => {
  switch (type) {
    case "GET_HISTORY":
      return history;
    default:
      return state;
  }
};

export default reducerHistory;
