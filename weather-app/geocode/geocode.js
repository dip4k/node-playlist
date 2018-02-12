const request = require("request");

function geocodeAddress(add, cb) {
  const encodedAddress = encodeURIComponent(add);
  request(
    {
      url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        cb("Unable to connect to Api Server...");
      } else if (body.status === "ZERO_RESULTS") {
        cb("Entered Address is not valid");
      } else if (body.status === "OK") {
        // console.log(JSON.stringify(body, undefined, 2));

        cb(undefined, {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    }
  );
}
module.exports = {
  geocodeAddress
};
