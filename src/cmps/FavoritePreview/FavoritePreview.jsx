import './FavoritePreview.scss';
import { useEffect, useState } from 'react';
import { weatherService } from '../../services/weatherService';
import { useDispatch } from 'react-redux';
import {
  getCurrentWeather,
  getFiveDaysForecast,
  setNewLocation,
} from '../../store/action/weatherActions';
import { useHistory } from 'react-router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

export const FavoritePreview = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const isCelsius = useSelector((state) => state.isCelsius);
  const isDarkMode = useSelector((state) => state.isDarkMode);

  useEffect(() => {
    (async () => {
      const weatherData = await weatherService.getWeather(location.Key);
      await setWeather(weatherData);
    })();
  }, [location.Key]);

  const temperature = isCelsius
    ? weather && weather[0].Temperature.Metric.Value
    : weather && weather[0].Temperature.Imperial.Value;
  const metricSign = isCelsius ? '°C' : '°F';

  const onSelectLocation = async () => {
    dispatch(setNewLocation(location));
    dispatch(getCurrentWeather(location.Key));
    dispatch(getFiveDaysForecast(location.Key));
    history.push('/');
  };

  return (
    <article className="favorite-preview" onClick={onSelectLocation}>
      <Card className={`${isDarkMode ? 'dark-mode' : ''}`}>
        <CardContent>
          <Typography
            className="card-typography-title"
            variant="h5"
            component="h2"
          >
            {location.LocalizedName}
          </Typography>
          {weather && (
            <Typography
              className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
              color="textSecondary"
            >
              temp: {temperature} {metricSign}
            </Typography>
          )}
          {weather && (
            <Typography
              className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
              color="textSecondary"
            >
              {weather[0].WeatherText}
            </Typography>
          )}
        </CardContent>
      </Card>
    </article>
  );
};
