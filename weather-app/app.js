const request = require("request");
const yargs = require("yargs");

const geocode = require("./geocode/geocode");

const ApiKey = "52cc995daae16302bef69c78ff3375b9";

const argv = yargs
  .options({
    a: {
      describe: "Address to fetch weather for",
      demand: true,
      alias: "address",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

const getWeatherResult = (weatherApiKey, latitude, longitude) => {
  request(
    {
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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    getWeatherResult(ApiKey, results.latitude, results.longitude);
  }
});
