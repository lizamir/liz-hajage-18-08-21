import { storageService } from './storageService.js';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_KEY = 'dlds2InmiZd04CAuI2U7EMPVMK6qjpP1';
const API_WEATHER_URL = 'https://dataservice.accuweather.com'
const STORAGE_KEY = 'FAVORITE';
const notify = (msg) => toast(msg);
var favoriteLocation = storageService.load(STORAGE_KEY) || [];

export const weatherService = {
    query,
    getWeather,
    getFiveDaysForecast,
    updateFavoriteList,
    getFavoriteList,
    getGeoLocation,
    removeFromFavoriteList
}

//get autocomplete search  
async function query(q) {
    try {
        if (q === '') return []

        const english = /^[A-Za-z ]*$/;
        if (!(english.test(q))) {
            notify('Please search english letter only')
            return []
        }
        const response = await axios.get(`${API_WEATHER_URL}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${q}`);
        return response.data;
    } catch (error) {
        console.error('weather service: error while try to fetch autocomplete search');
    }
}

//get weather from location code
async function getWeather(locationCode) {
    try {
        const response = await axios.get(`${API_WEATHER_URL}/currentconditions/v1/${locationCode}?apikey=${API_KEY}&details=true&metric=true`);
        return response.data;
    } catch (error) {
        console.error('weather service: error while try to fetch current weather');
    }
}

//get 5 days forecast weather from location code
async function getFiveDaysForecast(locationCode) {
    try {
        const response = await axios.get(`${API_WEATHER_URL}/forecasts/v1/daily/5day/${locationCode}?apikey=${API_KEY}&details=true&metric=true`);
        return response.data;
    } catch (error) {
        console.error('weather service: error while try to fetch current weather');
    }
}

//get location from geolocation 
async function getGeoLocation(lat, lon) {
    try {
        const response = await axios.get(`${API_WEATHER_URL}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat},${lon}`);
        console.log(response);
        notify('success getting your location')
        return response.data;
    } catch (error) {
        notify('error while try to get your location')
        console.error('weather service: error while try to fetch from geolocation api');
    }
}

//add to favorite list 
async function updateFavoriteList(location) {
    try {
        favoriteLocation.unshift(location)
        storageService.save(STORAGE_KEY, favoriteLocation)
        notify('location was added to your favorite')
        return storageService.load(STORAGE_KEY);
    } catch (error) {
        notify('error while try to add to favorite')
        console.error('weather service: error while try to updateFavorite');
    }
}

//remove from favorite list 
async function removeFromFavoriteList(location) {
    try {
        const updateFavoriteLocation = favoriteLocation.filter(favorite => favorite.Key !== location.Key)
        favoriteLocation = updateFavoriteLocation
        storageService.save(STORAGE_KEY, updateFavoriteLocation)
        notify('location was removed from your favorite')
        return storageService.load(STORAGE_KEY);
    } catch (error) {
        notify('error while try to remove favorite')
        console.error('weather service: error while try to updateFavorite');
    }
}

function getFavoriteList() { return favoriteLocation };





