import { combineReducers } from "redux";
import reducerWeather from "./reducerWeather";
import reducerHistory from "./reducerHistory";

const rootReducer = combineReducers({
  weather: reducerWeather,
  historyList: reducerHistory,
});

export default rootReducer;
