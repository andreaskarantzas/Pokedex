/**
 * Created by andreaskarantzas on 27.12.20.
 */
import { combineReducers } from "@reduxjs/toolkit";
import { pokemonReducer } from "../features/pokemonsList/pokemonListSlice";
import { pokemonBagReducer } from "../features/pokemonBag/pokemonBagSlice";
import { autocompleteReducer } from "../features/autocomplete/autocompleteSlice";
import { pokemonSpeciesReducer } from "../features/pokemonSpecies/pokemonSpeciesSlice";

const rootReducer = combineReducers({
  /** the reducer for the pokemon data loaded
   * in the main page and used throughout the app **/
  pokemon: pokemonReducer,
  /** the reducer for the pokemon species data loaded
   * and used in the pokemon details relevant page **/
  pokemonSpecies: pokemonSpeciesReducer,
  /** the reducer for loading and managing the "my bag"
   * saved pokemons  **/
  pokemonBag: pokemonBagReducer,
  /** the reducer that loads the initial NamedApiResource data
   * from the PokeAPI in order to fulfill the autocomplete
   * functionality **/
  autocomplete: autocompleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
