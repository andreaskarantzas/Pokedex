/**
 * Created by andreaskarantzas on 29.12.20.
 * https://pokeapi.co/docs/v2#resource-listspagination-section
 */
import { NamedAPIResource } from "./NamedAPIResource";

export type Pageable = {
  count: number;
  next: string;
  previous: string;
  results: Array<NamedAPIResource>;
};
