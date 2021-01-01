/**
 * Created by andreaskarantzas on 30.12.20.
 */
import { Pokemon } from "./Pokemon";
import { RequestStatusType } from "./RequestStatusType";

export type PokemonDataType = {
  data: Array<Pokemon | undefined>;
  offset: number;
} & RequestStatusType;
