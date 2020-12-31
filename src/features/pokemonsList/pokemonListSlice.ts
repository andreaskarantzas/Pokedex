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
      state.data = [];
      state.offset = 0;
    },
    preparePokemonsList(state) {
      if (state.offset === 0) {
        state.data = [];
      }
      state.loading = true;
      state.error = null;
    },
    setPokemonsListSuccess(state, { payload }: PayloadAction<boolean>) {
      const hasMore = payload;
      state.loading = false;
      state.error = null;
      if (hasMore) {
        state.offset += 20;
      }
    },
    setPokemonsListFailure(state, { payload }: PayloadAction<string>) {
      state.loading = false;
      state.error = payload;
    },
    getPokemonsReducer(state, { payload }: PayloadAction<Pokemon>) {
      const pokemon = payload;
      const pokemonExists = state.data.find(
        (p: Pokemon) => p && p.id === pokemon.id
      );
      if (!pokemonExists) {
        state.data.push(pokemon);
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
    dispatch(preparePokemonsList());
    // @ts-ignore
    const res: Pageable = await pokeApiGet("pokemon", {
      limit: 9,
      offset: pokemon.offset,
    });
    for await (const [index, { url }] of res.results.entries()) {
      const pokemonId = Number(url.split("/").slice(-2)[0]);
      const pokemon = await pokeApiGet(`pokemon/${pokemonId}`);
      dispatch(getPokemonsReducer(pokemon));
      //}
    }
    dispatch(setPokemonsListSuccess(!!res.next));
  } catch (err) {
    dispatch(setPokemonsListFailure(err));
  }
};

export const fetchPokemonsByIdOrName = (query: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(resetPokemonsList());
    dispatch(preparePokemonsList());
    // @ts-ignore
    const pokemon = await pokeApiGet(`pokemon/${query}`);
    dispatch(getPokemonsReducer(pokemon));
    dispatch(setPokemonsListSuccess(false));
  } catch (err) {
    dispatch(setPokemonsListFailure(err));
  }
};
