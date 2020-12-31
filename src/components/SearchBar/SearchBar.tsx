/**
 * Created by andreaskarantzas on 29.12.20
 */

import React, { useCallback, useEffect, useRef } from "react";
import { StyledComponentProps } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { Display } from "../Display/Display";
import { SearchError } from "../Labels/SearchError";
import { Grid } from "@material-ui/core";

export interface SearchBarProps extends StyledComponentProps {
  onValueChange?: (text: string) => void;
  query?: string;
  label?: string;
  autocompleteData?: Array<any>;
  autocompleteIdentifier?: string;
  error?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const { onValueChange, label, autocompleteIdentifier, error, query } = props;
  const debounce = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    return () => {
      debounce.current && clearTimeout(debounce.current);
    };
  }, []);

  const handleQueryChange = useCallback(
    ({ target: { value } }: any) => {
      debounce.current && clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        onValueChange && onValueChange(value);
      }, 400);
    },
    [onValueChange]
  );

  const handleAutocompleteChange = React.useCallback(
    (event: any, value: any) => {
      if (value && autocompleteIdentifier) {
        onValueChange && onValueChange(value[autocompleteIdentifier]);
      } else {
        onValueChange && onValueChange("");
      }
    },
    [onValueChange, autocompleteIdentifier]
  );

  return (
    <Grid container direction="column">
      <Autocomplete
        id="autocomplete-box"
        freeSolo
        disableClearable={true}
        fullWidth={true}
        options={props.autocompleteData || []}
        getOptionLabel={(option) =>
          props.autocompleteIdentifier
            ? option[props.autocompleteIdentifier]
            : undefined
        }
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id="searchBar"
            label={label || "Search"}
            variant="outlined"
            margin="normal"
            onChange={handleQueryChange}
            fullWidth={true}
          />
        )}
      />
      <Display enable={error}>
        <SearchError query={query} />
      </Display>
    </Grid>
  );
};
