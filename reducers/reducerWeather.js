const initialState = {
  location: null,
  geocode: null,
  weather: null,
  errorMessage: "",
};

const reducerWeather = (state = initialState, { type, data, geocode, coords }) => {
  switch (type) {
    case "GET_WEATHER":
      return {
        ...state,
        location: coords,
        geocode: geocode,
        weather: data,
        errorMessage: "",
      };
    case "ERROR_WEATHER":
      return {
        ...state,
        errorMessage: "Permission to access location was denied",
      };
    default:
      return state;
  }
};

export default reducerWeather;
