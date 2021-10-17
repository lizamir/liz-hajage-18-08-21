import './WeatherDetails.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentWeather,
  getFiveDaysForecast,
  addToFavoriteList,
  removeFromFavoriteList,
} from '../../store/action/weatherActions';

import { SearchBar } from '../../cmps/SearchBar';
import { WeatherList } from '../../cmps/WeatherList';
import { CurrentWeather } from '../../cmps/CurrentWeather';
import { UserLocationBtn } from '../../cmps/UserLocationBtn';
import { WeatherState, Location } from '../../interface';

export const WeatherDetails = () => {
  const dispatch = useDispatch();
  const currLocation = useSelector(
    (state: WeatherState) => state.currentLocation
  );
  const currWeather = useSelector((state: WeatherState) => state.currWeather);
  const currFiveDaysForecast = useSelector(
    (state: WeatherState) => state.currFiveDaysForecast
  );
  const favoriteLocations = useSelector((state: WeatherState): any => {
    const { favoriteLocations } = state;
    return favoriteLocations;
  });
  const isFavorite = favoriteLocations.some(
    (location: Location) => location['Key'] === currLocation.Key
  );

  useEffect(() => {
    dispatch(getCurrentWeather(currLocation.Key));
    dispatch(getFiveDaysForecast(currLocation.Key));
  }, [currLocation.Key, dispatch]);

  const toggleFavorite = (location: Array<Object>, needToRemove: boolean) => {
    if (needToRemove) {
      dispatch(removeFromFavoriteList(location));
    } else {
      dispatch(addToFavoriteList(location));
    }
  };

  return (
    <main className="weather-details">
      <div className="search-container">
        <SearchBar />
        <UserLocationBtn />
      </div>
      {currWeather && (
        <CurrentWeather
          currWeather={currWeather}
          currentLocation={currLocation}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
      {currFiveDaysForecast && (
        <WeatherList
          currFiveDaysForecast={currFiveDaysForecast.DailyForecasts}
        />
      )}
    </main>
  );
};
