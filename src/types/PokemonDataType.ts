/**
 * Created by andreaskarantzas on 30.12.20.
 * https://pokeapi.co/docs/v2#types
 * https://pokeapi.co/docs/v2#pokemon-species
 */
import { Pokemon } from "./Pokemon";
import { RequestStatusType } from "./RequestStatusType";

export type PokemonDataType = {
  data: Array<Pokemon | undefined>;
  offset: number;
} & RequestStatusType;
