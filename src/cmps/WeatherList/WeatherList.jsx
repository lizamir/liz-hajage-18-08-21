import './WeatherList.scss';
import { WeatherPreview } from '../WeatherPreview';

export const WeatherList = ({ currFiveDaysForecast }) => {
  return (
    <section className="weather-list">
      {currFiveDaysForecast &&
        currFiveDaysForecast.map((dailyWeather, idx) => (
          <WeatherPreview key={idx} dailyWeather={dailyWeather} />
        ))}
    </section>
  );
};
