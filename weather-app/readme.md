# Simple Weather app using node js

### Npm packages used in this app

* yargs --> for command line arguments.
* request --> http request library.
* axios --> promise based http request library.

### Api used

* [Google GeoCode Api](https://developers.google.com/maps/documentation/geocoding/start "Google Geocode api Guide")
* [Forecast.io weather Api](https://darksky.net/dev/docs "Forecast Api starting guide")

### Usage

#### node app.js --options--

* For help use
  ```bash
  node app.js --help
  ```
* To get weather of loaction specified by -a/-address

  ```bash
  node app.js -a address/pincode
  ```

* Example
  ```bash
  node app.js -a mumbai
  ```
