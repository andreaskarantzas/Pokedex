/**
 * Created by andreaskarantzas on 28.12.20.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { Pokemon } from "../../types/Pokemon";
import { pokeApiGet } from "../../api/pokeApi";
import { Pageable } from "../../types/Pageable";
import { PokemonDataType } from "../../types/PokemonDataType";

const initialState: PokemonDataType = {
  data: [],
  offset: 0,
  loading: false,
  error: null,
};

const pokemonsListSlice = createSlice({
  name: "pokemonsList",
  initialState,
  reducers: {
    resetPokemonsList(state) {
      /** reset the list when needed
       * (ex. when requesting single pokemon) **/
      state.data = [];
      state.offset = 0;
    },
    /** set up state between calls **/
    preparePokemonsList(
      state,
      action: PayloadAction<{ numberOfEntries: number }>
    ) {
      const { numberOfEntries } = action.payload;
      /** if first api call => clear data,
       * otherwise merge results **/
      if (state.offset === 0) {
        state.data = [];
      }
      /** in order to show the skeletons while loading
       *  the array is filled with undefined values and assigned
       *  when available**/
      const newPendingData = new Array(numberOfEntries).fill(undefined);
      state.data.push(...newPendingData);
      state.loading = true;
      state.error = null;
    },
    setPokemonsListSuccess(state, action: PayloadAction<{ hasMore: boolean }>) {
      const { hasMore } = action.payload;
      state.loading = false;
      state.error = null;
      if (hasMore) {
        state.offset += 6;
      }
    },
    setPokemonsListFailure(state, action: PayloadAction<{ err: string }>) {
      const { err } = action.payload;
      state.loading = false;
      state.error = err;
    },
    getPokemonsReducer(
      state,
      action: PayloadAction<{
        index: number;
        pokemon: Pokemon;
        numberOfEntries: number;
      }>
    ) {
      const { pokemon, index, numberOfEntries } = action.payload;
      const pokemonExists = state.data.find(
        (p?: Pokemon) => p && p.id === pokemon.id
      );
      /** assign pokemon to the correct position **/
      if (!pokemonExists) {
        state.data[state.data.length - (numberOfEntries - index)] = pokemon;
      }
    },
  },
});

export const {
  resetPokemonsList,
  preparePokemonsList,
  setPokemonsListSuccess,
  setPokemonsListFailure,
  getPokemonsReducer,
} = pokemonsListSlice.actions;

export const pokemonReducer = pokemonsListSlice.reducer;

export const fetchPokemons = (): AppThunk => async (dispatch, getState) => {
  const { pokemon } = getState();
  try {
    dispatch(preparePokemonsList({ numberOfEntries: 6 }));
    const res: Pageable = await pokeApiGet("pokemon", {
      limit: 6,
      offset: pokemon.offset,
    });
    for await (const [index, { url }] of res.results.entries()) {
      const pokemonId = Number(url.split("/").slice(-2)[0]);
      const pokemon = await pokeApiGet(`pokemon/${pokemonId}`);
      dispatch(getPokemonsReducer({ index, pokemon, numberOfEntries: 6 }));
    }
    dispatch(setPokemonsListSuccess({ hasMore: !!res.next }));
  } catch (err) {
    dispatch(setPokemonsListFailure(err));
  }
};

export const fetchPokemonsByIdOrName = (query: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(resetPokemonsList());
    dispatch(preparePokemonsList({ numberOfEntries: 1 }));
    const pokemon = await pokeApiGet(`pokemon/${query}`);
    dispatch(getPokemonsReducer({ index: 0, pokemon, numberOfEntries: 1 }));
    dispatch(setPokemonsListSuccess({ hasMore: false }));
  } catch (err) {
    dispatch(setPokemonsListFailure({ err: JSON.stringify(err) }));
  }
};
