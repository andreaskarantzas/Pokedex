/**
 * Created by andreaskarantzas on 28.12.20.
 * types from https://pokeapi.co/docs/v2#pokemon-species
 */
import { NamedAPIResource } from "./NamedAPIResource";

export type PokemonSpecies = {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: {
    entry_number: number;
    pokedex: NamedAPIResource;
  }[];
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource;
  habitat: NamedAPIResource;
  generation: NamedAPIResource;
  names: {
    name: string;
    language: NamedAPIResource;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }[];
  form_descriptions: {
    description: string;
    language: NamedAPIResource;
  }[];
  genera: {
    genus: string;
    language: NamedAPIResource;
  }[];
  varieties: {
    is_default: boolean;
    pokemon: NamedAPIResource;
  }[];
};
