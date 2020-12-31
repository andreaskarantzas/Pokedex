/**
 * Created by andreaskarantzas on 27.12.20.
 */
import { combineReducers } from "@reduxjs/toolkit";
import { pokemonReducer } from "../features/pokemonsList/pokemonListSlice";
import { pokemonBagReducer } from "../features/pokemonBag/pokemonBagSlice";
import { autocompleteReducer } from "../features/autocomplete/autocompleteSlice";
import { pokemonSpeciesReducer } from "../features/pokemonSpecies/pokemonSpeciesSlice";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  pokemonSpecies: pokemonSpeciesReducer,
  pokemonBag: pokemonBagReducer,
  autocomplete: autocompleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
