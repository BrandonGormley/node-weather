const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=397ed9644789fdbb2c26c85dc0bfdac8&query=${longitude},${latitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to the weather service`, undefined);
    } else if (body.error) {
      callback(`Unable to find location for weather`, undefined);
    } else {
      callback(
        undefined,
        `In ${body.location.name} it is currently ${body.current.temperature} degrees, with a ${body.current.precip}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
