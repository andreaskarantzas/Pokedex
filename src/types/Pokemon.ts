/**
 * Created by andreaskarantzas on 28.12.20.
 * https://pokeapi.co/docs/v2#pokemon
 */
import { NamedAPIResource } from "./NamedAPIResource";
import { PokemonAbility } from "./PokemonAbility";
import { PokemonSprites } from "./PokemonSprites";
import { PokemonType } from "./PokemonType";
import { PokemonStat } from "./PokemonStat";

export type Pokemon = {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  sprites: PokemonSprites;
  species: NamedAPIResource[];
  stats: PokemonStat[];
  types: PokemonType[];
};
