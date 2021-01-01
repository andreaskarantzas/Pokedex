/**
 * Created by andreaskarantzas on 29.12.20.
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../types/Pokemon";
import AppStore from "../../Util/AppStore";
import { PokemonDataType } from "../../types/PokemonDataType";

type BagListState = {} & Pick<PokemonDataType, "data">;

/** load previously locally saved state of the bag **/
const cachedBagData = AppStore.get("MyPokemonBag")
  ? JSON.parse(AppStore.get("MyPokemonBag")!)
  : [];

const initialState: BagListState = {
  data: cachedBagData,
};

const pokemonBagSlice = createSlice({
  name: "bagList",
  initialState,
  reducers: {
    addPokemonToBag(state, action: PayloadAction<{ pokemon: Pokemon }>) {
      const { pokemon } = action.payload;
      const pokemonExistsInBag = state.data.find(
        (p?: Pokemon) => p && p.id === pokemon.id
      );
      if (!pokemonExistsInBag) {
        state.data.push(pokemon);
        AppStore.store("MyPokemonBag", JSON.stringify(state.data));
      }
    },
    removePokemonFromBag(state, action: PayloadAction<{ pokemon: Pokemon }>) {
      const { pokemon } = action.payload;
      const pokemonBagIndex = state.data.findIndex(
        (p?: Pokemon) => p && p.id === pokemon.id
      );
      if (pokemonBagIndex !== -1) {
        state.data.splice(pokemonBagIndex, 1);
        AppStore.store("MyPokemonBag", JSON.stringify(state.data));
      }
    },
  },
});

export const {
  addPokemonToBag,
  removePokemonFromBag,
} = pokemonBagSlice.actions;

export const pokemonBagReducer = pokemonBagSlice.reducer;
