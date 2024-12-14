const initialState = {
  heroes: [],
};

export const heroesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HEROES":
      return {
        ...state,
        heroes: action.payload,
      };
    case "ADD_HERO":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };
    case "DELETE_HERO":
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero._id !== action.payload),
      };
    default:
      return state;
  }
};
