interface _CurrWeatherEntry {
  Temperature: MetricsImperial;
  RealFeelTemperature: MetricsImperial;
  Wind: { Speed: MetricsImperial };
  RelativeHumidity: String;
  WeatherText: String;
  WeatherIcon: Number;
}

interface _ValueUnit {
  Value: String;
  Unit: String;
}

interface MetricsImperial {
  Imperial: _ValueUnit;
  Metric: _ValueUnit;
}

export interface WeatherState {
  currentLocation: {
    Key: string;
    Type: string;
    LocalizedName: string;
    Country: object;
    id: string;
  };

  toggleFavorite: Function;
  isFavorite: Boolean;
  isCelsius?: Boolean;
  isDarkMode?: Boolean;

  currWeather: _CurrWeatherEntry[];
  currFiveDaysForecast?: {
    DailyForecasts: Array<Object>;
  };
  favoriteLocations?: Array<Location>;
}

export interface Location {
  Key: string;
  Type: string;
  LocalizedName: string;
  Country: object;
  id: string;
}
