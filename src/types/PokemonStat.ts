/**
 * Created by andreaskarantzas on 29.12.20.
 */
import { NamedAPIResource } from "./NamedAPIResource";

export type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};
