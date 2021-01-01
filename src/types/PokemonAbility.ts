/**
 * Created by andreaskarantzas on 29.12.20.
 * https://pokeapi.co/docs/v2#abilities
 */
import { NamedAPIResource } from "./NamedAPIResource";

export type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};
