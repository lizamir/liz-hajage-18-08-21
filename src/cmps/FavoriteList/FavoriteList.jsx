import './FavoriteList.scss';
import { FavoritePreview } from '../FavoritePreview';

export const FavoriteList = ({ favoriteLocations }) => {
  return (
    <section className="favorite-list">
      {favoriteLocations &&
        favoriteLocations.map((location) => (
          <FavoritePreview key={location.Key} location={location} />
        ))}
    </section>
  );
};
