/**
 * Created by andreaskarantzas on 29.12.20.
 */
import { NamedAPIResource } from "./NamedAPIResource";

export type Pageable = {
  count: number;
  next: string;
  previous: string;
  results: Array<NamedAPIResource>;
};
