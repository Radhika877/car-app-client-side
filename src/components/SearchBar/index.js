/*
This is the search bar component which can get search results based
on Sales ID or Customer ID
*/
import { Grid, InputAdornment, TextField } from "@material-ui/core";


const SearchBar = ({ searchString, setSearchString }) => {
  return (
    <Grid container xs={12}>
      <TextField
        fullWidth
        label="Search Sales ID or Customer ID"
        variant="outlined"
        value={searchString}
        onChange={(event) => setSearchString(event.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default SearchBar;
