const path = require('path'); // Core Node module
const express = require('express'); // Requires express
const hbs = require('hbs'); // Requires hbs

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); // Calls express into app (default behavior)
const port = process.env.PORT || 3000; // Heroku Port OR Local 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); // Creates our path to use for express.static
const viewsPath = path.join(__dirname, '../templates/pages');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Brandon Gormley',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Brandon Gormley',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text',
    title: 'Help',
    name: 'Brandon Gormley',
  });
});

app.get(`/weather`, (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(longitude, latitude, (error, forecast_data) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecast_data,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Brandon Gormley',
    errorMessage: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    errorMessage: 'Page not found.',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
