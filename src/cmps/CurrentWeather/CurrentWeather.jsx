import './CurrentWeather.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import blackstar from '../../assets/icons/blackstar.png';
import yellowstar from '../../assets/icons/yellowstar.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#6F4C5B',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 40,
  },
});

export const CurrentWeather = ({
  currWeather,
  currLocation,
  toggleFavorite,
  isFavorite,
}) => {
  const classes = useStyles();
  const isCelsius = useSelector((state) => state.isCelsius);
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const metricSign = isCelsius ? '°C' : '°F';
  const temperatures = isCelsius
    ? [
        currWeather[0].Temperature.Metric.Value,
        currWeather[0].RealFeelTemperature.Metric.Value,
        currWeather[0].Wind.Speed.Metric.Value,
        currWeather[0].Wind.Speed.Metric.Unit,
      ]
    : [
        currWeather[0].Temperature.Imperial.Value,
        currWeather[0].RealFeelTemperature.Imperial.Value,
        currWeather[0].Wind.Speed.Imperial.Value,
        currWeather[0].Wind.Speed.Imperial.Unit,
      ];

  return (
    <section className="current-weather">
      <Card className={`current-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <CardContent>
          <Typography
            className="card-typography-title"
            variant="h5"
            component="h2"
          >
            {currLocation.LocalizedName}
          </Typography>
          <Typography
            className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
            color="textSecondary"
          >
            Temp: {temperatures[0]} {metricSign}
          </Typography>
          <Typography
            className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
            color="textSecondary"
          >
            Feel: {temperatures[1]} {metricSign}
          </Typography>
          <Typography
            className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
            color="textSecondary"
          >
            Homidity: {currWeather[0].RelativeHumidity}
          </Typography>
          <Typography
            className={`card-typography ${isDarkMode ? 'dark-mode' : ''}`}
            color="textSecondary"
          >
            Wind Speed: {temperatures[2]} {temperatures[3]}
          </Typography>
        </CardContent>
      </Card>

      <div className=" flex align-center justify-center weather-summery">
        <h2 className={`text-field ${isDarkMode ? 'darki-mode' : ''}`}>
          {currWeather[0].WeatherText}
        </h2>
        {currWeather[0].WeatherIcon < 10 ? (
          <img
            className="weather-img"
            src={`https://developer.accuweather.com/sites/default/files/0${currWeather[0].WeatherIcon}-s.png`}
            alt="weather icon"
          ></img>
        ) : (
          <img
            className="weather-img"
            src={`https://developer.accuweather.com/sites/default/files/${currWeather[0].WeatherIcon}-s.png`}
            alt="weather icon"
          ></img>
        )}
      </div>

      <div className="add-favorite">
        {isFavorite ? (
          <Button
            className={classes.root}
            onClick={() => toggleFavorite(currLocation, true)}
            variant="contained"
          >
            <img className="icon-start" src={blackstar} alt="home-icon" />
            remove from favorite
          </Button>
        ) : (
          <Button
            onClick={() => toggleFavorite(currLocation, false)}
            variant="contained"
            className={classes.root}
          >
            <img className="icon-start" src={yellowstar} alt="home-icon" />
            add to favorite
          </Button>
        )}
      </div>
    </section>
  );
};
