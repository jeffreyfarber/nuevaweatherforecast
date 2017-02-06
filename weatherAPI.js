import moment from 'moment';

const AERIS_CLIENT_ID = '0eMxRAeeo9ePYk9HdurS7';
const AERIS_CLIENT_SECRET = 'E57wbnHxx1Ebkq81ClFh1U6DoN2ZzQfEUJ8xMj2V';

export function getForecastForCity(city) {
  return fetch('https://api.aerisapi.com/forecasts/'+city+'?client_id='+AERIS_CLIENT_ID+'&client_secret='+AERIS_CLIENT_SECRET)
  .then(response => response.json())
  .then(responseJson => {
    if (responseJson.success) {
      return {
        error: false,
        city: city,
        forecast: parseForecast(responseJson.response[0].periods),
      };
    }
    else {
      return {
        error: true,
      };
    }
  });
}

function parseForecast(periods) {
  var forecasts = [];
  for (var i = 0; i < periods.length; i++) {
    // Get the forecast for period "i"
    var forecastReceived = periods[i];
    var date = convertTimestampToDate(forecastReceived.validTime);

    var myForecast = {
      description: forecastReceived.weather,
      date: date,
      averageTemp: forecastReceived.avgTempF,
      maximumTemp: forecastReceived.maxTempF,
      minimumTemp: forecastReceived.minTempF,
      precipitation: forecastReceived.precipIN,
      humidity: forecastReceived.humidity,
      feelsLikeTemp: forecastReceived.feelslikeF,
      windSpeed: forecastReceived.windSpeedMPH,
      windDirection: forecastReceived.windDir,

    };
    forecasts.push(myForecast);
  }
  return forecasts;
}

function convertTimestampToDate(timestamp) {
  // Convert the timestamp for this period into a date/time
  var myMomentObject = moment(timestamp);
  var date = myMomentObject.format('dddd, MMM Do');
  return date;
}
