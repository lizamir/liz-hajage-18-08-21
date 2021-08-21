import './WeatherPreview.scss';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

export const WeatherPreview = ({ dailyWeather }) => {
  const isCelsius = useSelector((state) => state.isCelsius);
  const isDarkMode = useSelector((state) => state.isDarkMode);

  const metricSign = isCelsius ? '°C' : '°F';
  const celsiusToFahrenheit = (val) => ((val * 9) / 5 + 32).toFixed(2);

  const temperatures = isCelsius
    ? [
        dailyWeather.Temperature.Minimum.Value,
        dailyWeather.Temperature.Maximum.Value,
      ]
    : [
        celsiusToFahrenheit(dailyWeather.Temperature.Minimum.Value),
        celsiusToFahrenheit(dailyWeather.Temperature.Maximum.Value),
      ];

  return (
    <article className="weather-preview">
      <Card className={`${isDarkMode ? 'dark-mode' : ''}`}>
        <CardContent>
          <Typography
            className="card-typography-title"
            variant="h5"
            component="h2"
          >
            {moment(dailyWeather.Date).format('dddd')}
          </Typography>

          <Typography
            className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
            color="textSecondary"
          >
            Min Temp {temperatures[0]} {metricSign}
          </Typography>

          <Typography
            className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
            color="textSecondary"
          >
            Max Temp {temperatures[1]} {metricSign}
          </Typography>

          <Typography className="card-typography" color="textSecondary">
            {dailyWeather.Day.Icon < 10 ? (
              <img
                className="weather-img"
                src={`https://developer.accuweather.com/sites/default/files/0${dailyWeather.Day.Icon}-s.png`}
                alt="weather icon"
              ></img>
            ) : (
              <img
                className="weather-img"
                src={`https://developer.accuweather.com/sites/default/files/${dailyWeather.Day.Icon}-s.png`}
                alt="weather icon"
              ></img>
            )}
          </Typography>
        </CardContent>
      </Card>
    </article>
  );
};
