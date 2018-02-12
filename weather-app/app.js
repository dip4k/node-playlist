const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    weather.getWeatherResult(
      ApiKey,
      results.latitude,
      results.longitude,
      (errMessage, weatherResults) => {
        if (errMessage) {
          console.log(errMessage);
        } else {
          console.log(JSON.stringify(weatherResults, undefined, 2));
        }
      }
    );
  }
});
