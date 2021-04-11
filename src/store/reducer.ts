import { ActionTypes } from "./actionTypes";

const initialState: RootState = {
  data: {
    results: [],
    total: 0,
  },
  selectedCharacter: undefined,
  series: {
    results: [],
    total: 0,
  },
};

const reducer = (state: RootState = initialState, action: CharacterAction) => {
  switch (action.type) {
    case ActionTypes.SET_CHARACTERS:
      return {
        ...state,
        data: {
          results: action.characters?.results || [],
          total: action.characters?.total || 0,
        },
        series: { results: [], total: 0 },
      };
    case ActionTypes.SET_SELECTED_CHARACTER:
      return {
        ...state,
        selectedCharacter: action.selectedCharacter,
      };
    case ActionTypes.EDIT_SELECTED_CHARACTER:
      return {
        ...state,
        selectedCharacter: action.selectedCharacter,
      };
    case ActionTypes.SET_SERIES:
      console.log("reducer para series");
      return {
        ...state,
        series: action.series,
      };
    default:
      return state;
  }
};

export default reducer;
