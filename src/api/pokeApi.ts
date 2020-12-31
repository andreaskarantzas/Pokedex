/**
 * Created by andreaskarantzas on 28.12.20.
 */
import { create, ApiResponse } from "apisauce";

const api = create({
  baseURL: "https://pokeapi.co/api/v2",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const filterResponse = (res: ApiResponse<any>) => {
  if (res.ok) {
    return res.data;
  }
  throw new Error(res.problem);
};

export async function pokeApiGet(path: string, params?: any) {
  return api
    .get(path, params)
    .then((res: ApiResponse<any>) => filterResponse(res));
}
