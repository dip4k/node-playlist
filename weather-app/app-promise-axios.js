const yargs = require("yargs");
const axios = require("axios");

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

const encodedAddress = encodeURIComponent(argv.address);
const geoCodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
  .get(geoCodeUrl)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("Unable to find address");
    }

    // console.log(response.data);

    const geocodeResult = {
      address: response.data.results[0].formatted_address,
      latitude: response.data.results[0].geometry.location.lat,
      longitude: response.data.results[0].geometry.location.lng
    };
    const weatherUrl = `https://api.darksky.net/forecast/${ApiKey}/${
      geocodeResult.latitude
    },${geocodeResult.longitude}`;
    return axios.get(weatherUrl);
  })
  .then(weatherResult => {
    console.log(JSON.stringify(weatherResult.data.currently, undefined, 2));
  })
  .catch(err => {
    if (err.code === "ENOTFOUND") {
      console.log("Unable to connect to Api Servers");
    } else {
      console.log(err.message);
    }
  });
