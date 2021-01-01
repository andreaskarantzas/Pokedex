/**
 * Created by andreaskarantzas on 28.12.20.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { pokeApiGet } from "../../api/pokeApi";
import { Pageable } from "../../types/Pageable";
import { PokemonDataType } from "../../types/PokemonDataType";
import AppStore from "../../Util/AppStore";
import { NamedAPIResource } from "../../types/NamedAPIResource";
import { Capitalize } from "../../Util/Capitalize";

type AutocompleteState = {
  autocompleteData: NamedAPIResource[];
} & Omit<PokemonDataType, "offset" | "data">;

const cachedAutocompleteData = AppStore.get("PokemonAutocompleteData")
  ? JSON.parse(AppStore.get("PokemonAutocompleteData")!)
  : [];

const initialState: AutocompleteState = {
  autocompleteData: cachedAutocompleteData,
  loading: false,
  error: null,
};

const autocompleteSlice = createSlice({
  name: "autocomplete",
  initialState,
  reducers: {
    /** set up state between calls **/
    prepareAutocompleteData(state) {
      state.loading = true;
      state.error = null;
    },
    setAutocompleteDataSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    setAutocompleteDataFailure(state, action: PayloadAction<{ err: string }>) {
      const { err } = action.payload;
      state.loading = false;
      state.error = err;
    },
    getAutocompleteDataReducer(
      state,
      { payload }: PayloadAction<Array<NamedAPIResource>>
    ) {
      const results = payload;
      if (results) {
        Array.from(results.entries()).map((e: [number, NamedAPIResource]) => {
          const [index, { url, name }] = e;
          return state.autocompleteData.push({ url, name: Capitalize(name) });
        });
        AppStore.store(
          "PokemonAutocompleteData",
          JSON.stringify(state.autocompleteData)
        );
      }
    },
  },
});

export const {
  prepareAutocompleteData,
  setAutocompleteDataSuccess,
  setAutocompleteDataFailure,
  getAutocompleteDataReducer,
} = autocompleteSlice.actions;

export const autocompleteReducer = autocompleteSlice.reducer;

export const fetchPokemonsForAutocomplete = (): AppThunk => async (
  dispatch,
  getState
) => {
  const { autocomplete } = getState();
  try {
    /** fetch only if the local storage has no entries or is first call **/
    if (autocomplete.autocompleteData.length === 0) {
      dispatch(prepareAutocompleteData());
      const res: Pageable = await pokeApiGet("pokemon", {
        limit: 1200,
      });
      dispatch(setAutocompleteDataSuccess());
      dispatch(getAutocompleteDataReducer(res.results));
    }
  } catch (err) {
    dispatch(setAutocompleteDataFailure({ err: JSON.stringify(err) }));
  }
};
