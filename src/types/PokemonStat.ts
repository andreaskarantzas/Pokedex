/**
 * Created by andreaskarantzas on 29.12.20.
 * https://pokeapi.co/docs/v2#stats
 */
import { NamedAPIResource } from "./NamedAPIResource";

export type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};
