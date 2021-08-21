import './SearchBar.scss';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  searchLocation,
  getCurrentWeather,
  getFiveDaysForecast,
  setNewLocation,
} from '../../store/action/weatherActions';
import Button from '@material-ui/core/Button';
import db from 'just-debounce';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
      transform: 'translate(34px, 20px) scale(1);',
      color: 'white',
    },
  },
  inputRoot: {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
      color: 'white',
    },
  },
  button: {
    background: '#9e7777',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 40,
    width: 150,
    padding: '0 30px',
    fontSize: 12,
    marginInlineStart: 24,
  },
}));

export const SearchBar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const searchLocations = useSelector((state) => state.searchLocations);
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const getAutocompleteSearch = ({ target }) => {
    const debounceAutocomplete = db(
      () => dispatch(searchLocation(target.value)),
      500
    );
    debounceAutocomplete();
  };

  const setSelectedLocation = (location) => {
    dispatch(getCurrentWeather(location.Key));
    dispatch(getFiveDaysForecast(location.Key));
    dispatch(setNewLocation(location));
  };

  return (
    <section className="search-bar">
      <Autocomplete
        //
        className={classes.inputRoot}
        id="combo-box-demo"
        options={searchLocations}
        getOptionLabel={(option) => option.LocalizedName}
        renderOption={(option) => {
          return (
            <div
              className="location-option"
              onClick={() => setSelectedLocation(option)}
            >
              <Button
                className={classes.button}
                onClick={() => setSelectedLocation(option)}
                variant="contained"
              >
                {`${option.LocalizedName}`}
              </Button>
            </div>
          );
        }}
        renderInput={(params) => (
          <TextField
            className={`text-search ${isDarkMode ? 'darki-mode' : ''}`}
            {...params}
            label="Search Location"
            variant="outlined"
            onChange={getAutocompleteSearch}
          />
        )}
      />
    </section>
  );
};
