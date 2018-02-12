const request = require("request");

const getWeatherResult = (weatherApiKey, latitude, longitude) => {
  request(
    {
      // api call to forcast.io

      url: `https://api.darksky.net/forecast/${weatherApiKey}/${latitude},${longitude}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(JSON.stringify(body.currently));
      } else if (response.statusCode === 404) {
        console.log("Unable to fetch weather....");
      }
    }
  );
};

module.exports = { getWeatherResult };
