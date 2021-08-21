import { NavLink } from 'react-router-dom';
import fav from '../../assets/icons/fav.png';
import home from '../../assets/icons/home.png';
import celsius from '../../assets/icons/celsius.png';
import fahrenheit from '../../assets/icons/fahrenheit.png';
import moon from '../../assets/icons/moon.png';
import sun from '../../assets/icons/sun.png';
import iconImage from '../../assets/icons/weather.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, toggleUnit } from '../../store/action/weatherActions';
import './Header.scss';

export const Header = (props) => {
  const dispatch = useDispatch();
  const isCelsius = useSelector((state) => state.isCelsius);
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const metric = isCelsius ? celsius : fahrenheit;
  const mode = isDarkMode ? moon : sun;

  const toggleMode = () => {
    dispatch(toggleDarkMode);
  };

  const toggleCelsius = () => {
    dispatch(toggleUnit);
  };

  return (
    <header className="app-header">
      <NavLink
        className="flex align-center justify-center"
        exact
        to="/"
        activeClassName="active-nav"
      >
        <img src={iconImage} alt="icon" />
      </NavLink>

      <ul className="navbar-header">
        <img
          className="icon-metric"
          src={metric}
          alt=""
          onClick={toggleCelsius}
        />
        <img className="icon-toggle" src={mode} alt="" onClick={toggleMode} />
        <NavLink exact to="/" activeClassName="active-nav">
          <img className="icon-nav" src={home} alt="home-icon" />
        </NavLink>
        <NavLink to="/favorite" activeClassName="active-nav">
          <img className="icon-nav" src={fav} alt="favorite-icon" />
        </NavLink>
      </ul>
    </header>
  );
};
