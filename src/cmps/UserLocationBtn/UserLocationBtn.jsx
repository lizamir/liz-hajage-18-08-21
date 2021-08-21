import './UserLocationBtn.scss';
import { useDispatch } from 'react-redux';
import { getLocationFromGeolocation } from '../../store/action/weatherActions';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#9e7777',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 50,
    padding: '0 30px',
    marginInlineStart: 20,
    marginBlockStart: 3,
  },
});

export const UserLocationBtn = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      geoLocationSuccess,
      geoLocationError
    );
  };

  const geoLocationSuccess = (position) => {
    dispatch(
      getLocationFromGeolocation(
        position.coords.latitude,
        position.coords.longitude
      )
    );
  };

  const geoLocationError = (err) => {
    console.log('got error when try to get geolocation', err);
  };

  return (
    <section className="user-location">
      <Button
        className={classes.root}
        variant="contained"
        onClick={getMyLocation}
      >
        Use My Location
      </Button>
    </section>
  );
};
