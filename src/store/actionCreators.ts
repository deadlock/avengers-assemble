import driver from "../api/driver";
import { ActionTypes } from "./actionTypes";
export const handleSearch = (searchName?: string, pagination?: Pagination) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await driver.getCharacters(
        pagination ? pagination : { limit: 20, offset: 0 },
        searchName ? { name: searchName } : undefined
      );

      const characters: Result<Character> = {
        results: result.data.results,
        total: result.data.total,
      };

      dispatch({ type: ActionTypes.SET_CHARACTERS, characters });
    } catch (error) {
      console.log("erro ao recuperar personagem");
    }
  };
};

export const handleSearchSeries = (
  pagination: Pagination,
  selectedCharacter: Character
) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await driver.getCharacterSeries(
        pagination,
        selectedCharacter.id.toString()
      );

      const series: Result<Serie> = {
        results: result.data.results,
        total: result.data.total,
      };

      dispatch({
        type: ActionTypes.SET_SERIES,
        characters: { results: [], total: 0 },
        selectedCharacter,
        series: series,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const handleSelectedCharacter = (character: Character) => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_CHARACTER,
      selectedCharacter: character,
    });
  };
};

export const handleEditcharacter = (character: Character) => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.EDIT_SELECTED_CHARACTER,
      selectedCharacter: character,
    });
  };
};
