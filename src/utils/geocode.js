const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYmdvcm1sZXkiLCJhIjoiY2txMnJlZTYxMHJqdDJwcWw2bXd4OXhyaSJ9.XU633u3EeA9urVjQuhxE5Q&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location servies!`, undefined);
    } else if (body.features.length === 0) {
      callback(`Unable to find location requested. Try again!`, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
