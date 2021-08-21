import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './cmps/Header';
import { WeatherDetails } from './pages/WeatherDetails';
import { WeatherFavorite } from './pages/WeatherFavorite';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkModeByCurrentTime } from './store/action/weatherActions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.isDarkMode);

  useEffect(() => {
    dispatch(setDarkModeByCurrentTime());
  }, [dispatch]);

  return (
    <div
      className={`App main-container ${
        isDarkMode ? 'background-dark' : 'background-light'
      }`}
    >
      <Router>
        <Header></Header>
        <Switch>
          <Route component={WeatherFavorite} path="/favorite"></Route>
          <Route component={WeatherDetails} exact path="/"></Route>
          {/* <Route component={PageNotFound} /> */}
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
