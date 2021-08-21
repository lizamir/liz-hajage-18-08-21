import './WeatherFavorite.scss';
import { useSelector } from 'react-redux';
import { FavoriteList } from '../../cmps/FavoriteList';

export const WeatherFavorite = () => {
  const favoriteLocations = useSelector((state) => state.favoriteLocations);
  const isDarkMode = useSelector((state) => state.isDarkMode);
  return (
    <section className="favorites-page">
      <div className={`text-field ${isDarkMode ? 'dark' : ''}`}>
        <h1>Your save Weather Location</h1>
      </div>
      {favoriteLocations && (
        <FavoriteList favoriteLocations={favoriteLocations} />
      )}
    </section>
  );
};
