/**
 * Created by andreaskarantzas on 29.20.20
 */

import React, { useCallback, useEffect, useRef } from "react";
import { StyledComponentProps, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ThemeConfig from "../../Theme";
import { Autocomplete } from "@material-ui/lab";

export interface SearchBarProps extends StyledComponentProps {
  onValueChange?: (text: string) => void;
  value?: string;
  label?: string;
  autocompleteData?: Array<any>;
  autocompleteIdentifier?: string;
}

export const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const { onValueChange, label, autocompleteIdentifier } = props;
  const classes = styles();
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
    <Autocomplete
      id="autocomplete-box"
      freeSolo
      options={props.autocompleteData || []}
      getOptionLabel={(option) =>
        props.autocompleteIdentifier
          ? option[props.autocompleteIdentifier]
          : undefined
      }
      onChange={handleAutocompleteChange}
      className={classes.autocomplete}
      renderInput={(params) => (
        <TextField
          {...params}
          id="searchBar"
          label={label || "Search"}
          variant="outlined"
          margin="normal"
          className={classes.textField}
          onChange={handleQueryChange}
        />
      )}
    />
  );
};

const styles = makeStyles((theme) => ({
  autocomplete: {
    width: "80%",
  },
  textField: {
    width: "50%",
  },
  searchIcon: {
    marginTop: 4,
    color: ThemeConfig.Colors.warmestGrey,
  },
}));
