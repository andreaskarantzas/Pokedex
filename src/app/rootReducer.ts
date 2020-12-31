/**
 * Created by andreaskarantzas on 27.12.20.
 */
import { combineReducers } from "@reduxjs/toolkit";
import { pokemonReducer } from "../features/pokemonsList/pokemonListSlice";
import { pokemonBagReducer } from "../features/pokemonBag/pokemonBagSlice";
import { autocompleteReducer } from "../features/autocomplete/autocompleteSlice";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  pokemonBag: pokemonBagReducer,
  autocomplete: autocompleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
