const request = require('request');

// const getWeatherResult = (weatherApiKey, latitude, longitude, cb) => {
//   request(
//     {
//       // api call to forcast.io

//       url: `https://api.darksky.net/forecast/${weatherApiKey}/${latitude},${longitude}`,
//       json: true
//     },
//     (error, response, body) => {
//       if (!error && response.statusCode === 200) {
//         cb(undefined, body.currently);
//       } else if (response.statusCode === 404) {
//         cb("Unable to fetch weather....");
//       }
//     }
//   );
// };

const getWeatherResult = (weatherApiKey, latitude, longitude) =>
  new Promise((resolve, reject) => {
    request(
      {
        // api call to forcast.io

        url: `https://api.darksky.net/forecast/${weatherApiKey}/${latitude},${longitude}`,
        json: true
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          resolve(body.currently);
        } else if (error && response.statusCode === 404) {
          reject(new Error(`Unable to fetch weather. Error code: ${error}`));
        }
      }
    );
  });

module.exports = { getWeatherResult };
