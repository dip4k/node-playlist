const request = require("request");
const yargs = require("yargs");

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
request(
  {
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  },
  (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(JSON.stringify(response, undefined, 2));

      console.log(`formatted address : ${body.results[0].formatted_address}`);
      console.log(
        `Location : lat --> ${
          body.results[0].geometry.location.lat
        }, long -->  ${body.results[0].geometry.location.lng}`
      );
    }
  }
);
