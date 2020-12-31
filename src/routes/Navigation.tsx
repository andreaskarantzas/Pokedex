/**
 * Created by andreaskarantzas on 27.12.20.
 */

import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "../views/MainPage/MainPage";
import { PokemonPage } from "../views/PokemonPage/PokemonPage";
import { NoMatch } from "./NoMatch";
import { Layout } from "../components/Layout/Layout";
import { BagPage } from "../views/BagPage/BagPage";
import { useEffect } from "react";
import { fetchPokemonsForAutocomplete } from "../features/autocomplete/autocompleteSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { CircularLoadingView } from "../components/LoadingElements/CircularLoadingView";

export type NavigationProps = {};

export const Navigation: React.FC<NavigationProps> = (_: NavigationProps) => {
  const dispatch = useDispatch();
  const { loading: loadingAutocompleteData } = useSelector(
    (state: RootState) => state.autocomplete
  );

  useEffect(() => {
    dispatch(fetchPokemonsForAutocomplete());
  }, []);

  return (
    <div>
      {loadingAutocompleteData ? (
        <CircularLoadingView />
      ) : (
        <BrowserRouter>
          <React.Suspense fallback={<CircularLoadingView />}>
            <Layout>
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/my-bag" component={BagPage} />
                {/** Dynamic URL with `:id` param embed **/}
                <Route path="/pokemon/:id" component={PokemonPage} />
                {/** A "fallback" route, to catch 404 errors **/}
                <Route component={NoMatch} />
              </Switch>
            </Layout>
          </React.Suspense>
        </BrowserRouter>
      )}
    </div>
  );
};
