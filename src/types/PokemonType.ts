/**
 * Created by andreaskarantzas on 29.12.20.
 * https://pokeapi.co/docs/v2#types
 */
import { NamedAPIResource } from "./NamedAPIResource";

export type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};
